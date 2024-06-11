import { doc, getDoc } from "firebase/firestore";

import { cancelSubscription, createCheckoutSession } from "@/actions/stripe";
import { db } from "@/firebase";
import { User } from "@/Providers/AuthProvider";
import { getClientStripe } from "@/utils/stripeClient";

export const handleSubscriptionCancellation = async (
	user: User | null,
	setUser: (user: User) => void,
) => {
	if (!user) {
		console.error("No user found.");
		return;
	}

	await cancelSubscription(user.stripeSubscriptionId);

	// Add a short delay for the subscription to be cancelled in firebase database
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const userDoc = await getDoc(doc(db, "users", user.uid));
	const userData = userDoc.exists() ? userDoc.data() : {};

	setUser({ ...user, ...userData });
};

export const handlePlanChange = async (user: User | null, priceId: string) => {
	if (!user) {
		console.error("No user found.");
		return;
	}

	try {
		const stripe = await getClientStripe();

		const successUrl = `${window.location.origin}/account?session_id={CHECKOUT_SESSION_ID}`;
		const cancelUrl = `${window.location.origin}/account`;

		const sessionId = await createCheckoutSession(
			priceId,
			successUrl,
			cancelUrl,
			user.uid,
			user.stripeCustomerId,
		);

		const { error } = await stripe!.redirectToCheckout({
			sessionId: sessionId!,
		});
		console.log("🚀 ~ handlePlanChange ~ error:", error);
	} catch (error: any) {
		console.error(error.message);
	}
};
