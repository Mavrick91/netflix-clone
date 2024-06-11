import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { adminDb } from "@/firebaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-04-10",
});

export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(req: NextRequest) {
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

	try {
		let event: Stripe.Event;
		const buf = await req.text();
		const sig = req.headers.get("stripe-signature") as string;

		try {
			event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
		} catch (err: any) {
			console.error("⚠️  Webhook signature verification failed.", err.message);
			return NextResponse.json(
				{ message: `Webhook Error: ${err.message}` },
				{ status: 400 },
			);
		}

		// Handle the event
		switch (event.type) {
			case "checkout.session.completed":
				const session = event.data.object as Stripe.Checkout.Session;
				await handleCheckoutSession(session);
				break;
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
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

	console.log(`Stored subscription data for user ${userId}`);
}
