"use client";

import { loadStripe } from "@stripe/stripe-js";

import { createCheckoutSession } from "@/actions/stripe";
import PlanSection from "@/components/PlanSection";
import { useAuth } from "@/Providers/AuthProvider";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const UpdatePlanPage = () => {
	const { user } = useAuth();

	const updatePlan = async (priceId: string) => {
		try {
			const stripe = await stripePromise;

			const successUrl = `${window.location.origin}/account?session_id={CHECKOUT_SESSION_ID}`;
			const cancelUrl = `${window.location.origin}/account`;

			const sessionId = await createCheckoutSession(
				priceId,
				successUrl,
				cancelUrl,
				user!.uid,
			);

			const { error } = await stripe!.redirectToCheckout({
				sessionId: sessionId!,
			});
			console.log("🚀 ~ updatePlan ~ error:", error);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	return (
		<div className="border-t border-[#999]">
			<PlanSection
				handleClickPlan={updatePlan}
				selectedPlan={user?.plan}
				isUpdatePlan
			/>
		</div>
	);
};
export default UpdatePlanPage;
