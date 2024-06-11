import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getClientStripe = () => {
	if (!stripePromise) {
		const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

		if (!stripePublicKey) {
			throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
		}

		stripePromise = loadStripe(stripePublicKey);
	}
	return stripePromise;
};
