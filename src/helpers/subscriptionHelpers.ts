import { createCheckoutSession } from "@/actions/stripe";
import { User } from "@/Providers/AuthProvider";
import { getClientStripe } from "@/utils/stripeClient";
import { getErrorMessage, logError } from "@/utils/utils";

export const handlePlanChange = async (user: User, priceId: string) => {
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

		throw new Error(error.message);
	} catch (error: unknown) {
		const errorMessage = getErrorMessage(error);
		logError(errorMessage);
	}
};
