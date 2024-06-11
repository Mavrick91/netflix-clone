import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { getServerStripe } from "@/actions/stripe";
import { adminDb } from "@/firebaseAdmin";

export async function POST(req: NextRequest) {
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

	try {
		let event: Stripe.Event;
		const buf = await req.text();
		const sig = req.headers.get("stripe-signature") as string;

		try {
			const stripe = await getServerStripe();
			event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
		} catch (err: any) {
			console.error("⚠️  Webhook signature verification failed.", err.message);
			return NextResponse.json(
				{ message: `Webhook Error: ${err.message}` },
				{ status: 400 },
			);
		}

		switch (event.type) {
			case "checkout.session.completed":
				const session = event.data.object as Stripe.Checkout.Session;
				await handleCheckoutSession(session);
				break;
			case "customer.subscription.updated":
				const subscription = event.data.object as Stripe.Subscription;
				await handleSubscriptionUpdate(subscription);
				break;
			case "customer.subscription.deleted":
				const deletedSubscription = event.data.object as Stripe.Subscription;
				await handleSubscriptionDeletion(deletedSubscription);
				break;
			case "payment_method.attached":
				const attachedPaymentMethod = event.data.object as Stripe.PaymentMethod;
				await handlePaymentMethodUpdate(attachedPaymentMethod);
				break;
			case "payment_method.detached":
				const detachedPaymentMethod = event.data.object as Stripe.PaymentMethod;
				await handlePaymentMethodUpdate(detachedPaymentMethod);
				break;
			case "customer.updated":
				const updatedCustomer = event.data.object as Stripe.Customer;
				await handleCustomerUpdate(updatedCustomer);
				break;
			default:
			// console.log(`Unhandled event type ${event.type}`);
		}

		return NextResponse.json({ received: true });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json(
			{ message: `Webhook Error: ${err.message}` },
			{ status: 500 },
		);
	}
}

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
	const userId = session.metadata?.userId;
	const stripe = await getServerStripe();

	if (!userId) {
		throw new Error("User ID not found in session metadata");
	}

	const userRef = adminDb.collection("users").doc(userId);

	const data: Record<string, any> = {
		stripeCustomerId: session.customer,
		stripeSubscriptionId: session.subscription,
		status: "active",
	};

	if (session.metadata?.plan) {
		data.plan = session.metadata.plan;
	}

	await userRef.set(data, { merge: true });

	const subscription = await stripe.subscriptions.retrieve(
		session.subscription as string,
	);
	const paymentMethod = await stripe.paymentMethods.retrieve(
		subscription.default_payment_method as string,
	);
	const card = paymentMethod.card;

	if (card) {
		const cardData: Record<string, any> = {
			cardBrand: card.brand,
			last4: card.last4,
		};

		await userRef.set(cardData, { merge: true });
	}

	await stripe.customers.update(session.customer as string, {
		invoice_settings: {
			default_payment_method: subscription.default_payment_method as string,
		},
	});
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
	const userId = subscription.metadata?.userId;

	if (!userId) {
		throw new Error("User ID not found in subscription metadata");
	}

	const userRef = adminDb.collection("users").doc(userId);

	const data: Record<string, any> = {
		stripeSubscriptionId: subscription.id,
		status: subscription.status,
		current_period_end: subscription.current_period_end,
		plan: subscription.items.data[0].price.id,
	};

	await userRef.set(data, { merge: true });
}

async function handleSubscriptionDeletion(subscription: Stripe.Subscription) {
	const userId = subscription.metadata?.userId;

	if (!userId) {
		throw new Error("User ID not found in subscription metadata");
	}

	const userRef = adminDb.collection("users").doc(userId);

	const data: Record<string, any> = {
		status: "canceled",
		stripeSubscriptionId: null,
		plan: null,
		current_period_end: null,
		createdAt: null,
	};

	await userRef.set(data, { merge: true });
}

async function handlePaymentMethodUpdate(paymentMethod: Stripe.PaymentMethod) {
	const userId = paymentMethod.metadata?.userId;

	if (!userId) {
		throw new Error("User ID not found in payment method metadata");
	}

	const userRef = adminDb.collection("users").doc(userId);

	const card = paymentMethod.card;

	if (card) {
		const cardData: Record<string, any> = {
			cardBrand: card.brand,
			last4: card.last4,
		};

		await userRef.set(cardData, { merge: true });
	}
}

async function handleCustomerUpdate(customer: Stripe.Customer) {
	const userId = customer.metadata?.userId;

	if (!userId) {
		throw new Error("User ID not found in customer metadata");
	}

	const userRef = adminDb.collection("users").doc(userId);

	const data: Record<string, any> = {
		stripeCustomerId: customer.id,
		status: customer.deleted ? "deleted" : "active",
	};

	await userRef.set(data, { merge: true });
}
