"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-04-10",
});

export const createCheckoutSession = async (
	priceId: string,
	successUrl: string,
	cancelUrl: string,
	userId: string,
) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: successUrl,
			cancel_url: cancelUrl,
			metadata: {
				userId: userId,
				plan: priceId,
			},
		});

		return session.id;
	} catch (err: any) {
		console.error(err.message);
		throw new Error("Unable to create Stripe session");
	}
};
