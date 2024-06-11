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
	userStripeCustomerId?: string,
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
			customer: userStripeCustomerId ? userStripeCustomerId : undefined,
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
