"use server";

import Stripe from "stripe";

export const getServerStripe = async () => {
	const stripe = await new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2024-04-10",
	});

	return stripe;
};

export const createCheckoutSession = async (
	priceId: string,
	successUrl: string,
	cancelUrl: string,
	userId: string,
	stripeCustomerId?: string,
) => {
	try {
		const stripe = await getServerStripe();
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			subscription_data: {
				metadata: {
					userId: userId,
					plan: priceId,
				},
			},
			mode: "subscription",
			success_url: successUrl,
			cancel_url: cancelUrl,
			customer: stripeCustomerId ? stripeCustomerId : undefined,
			metadata: {
				userId: userId,
				plan: priceId,
			},
			billing_address_collection: "auto",
		});

		return session.id;
	} catch (err: any) {
		console.error(err.message);
		throw new Error("Unable to create Stripe session");
	}
};

export const cancelSubscription = async (stripeSubscriptionId?: string) => {
	if (!stripeSubscriptionId) {
		console.error("Subscription ID not provided.");
		return;
	}

	try {
		const stripe = await getServerStripe();
		await stripe.subscriptions.cancel(stripeSubscriptionId);
	} catch (error: any) {
		console.error("Error canceling subscription:", error.message);
	}
};

export const updateCard = async (
	customerId: string,
	paymentMethodId: string,
) => {
	try {
		const stripe = await getServerStripe();

		const customer = (await stripe.customers.retrieve(
			customerId,
		)) as Stripe.Customer;

		if (!customer.deleted && customer.invoice_settings.default_payment_method) {
			await stripe.paymentMethods.detach(
				customer.invoice_settings.default_payment_method as string,
			);
		}

		await stripe.paymentMethods.attach(paymentMethodId, {
			customer: customerId,
		});

		await stripe.customers.update(customerId, {
			invoice_settings: { default_payment_method: paymentMethodId },
			metadata: {
				userId: customer.metadata.userId,
			},
		});

		await stripe.paymentMethods.update(paymentMethodId, {
			metadata: {
				userId: customer.metadata.userId,
			},
		});
	} catch (error: any) {
		console.error("Error updating card:", error.message);
		throw new Error("Unable to update card");
	}
};
