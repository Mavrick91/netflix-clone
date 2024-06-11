import { doc, getDoc, onSnapshot } from "firebase/firestore";

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

	const userDocRef = doc(db, "users", user.uid);

	const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
		if (docSnapshot.exists()) {
			const userData = docSnapshot.data();
			setUser({ ...user, ...userData });
		} else {
			console.error("User document does not exist.");
		}
	});

	setTimeout(() => unsubscribe(), 5000);

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
			user.email,
		);

		const { error } = await stripe!.redirectToCheckout({
			sessionId: sessionId!,
		});
		console.log("🚀 ~ handlePlanChange ~ error:", error);
	} catch (error: any) {
		console.error(error.message);
	}
};
