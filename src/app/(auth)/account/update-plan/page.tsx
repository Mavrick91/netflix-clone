"use client";

import PlanSection from "@/components/PlanSection";
import { handlePlanChange } from "@/helpers/subscriptionHelpers";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

const UpdatePlanPage = () => {
	const { user } = useAuthenticatedUser();

	return (
		<div className="border-t border-[#999]">
			<PlanSection
				handleClickPlan={(priceId: string) => handlePlanChange(user, priceId)}
				selectedPlan={user.plan}
				isUpdatePlan
			/>
		</div>
	);
};
export default UpdatePlanPage;
