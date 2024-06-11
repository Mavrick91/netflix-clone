"use client";

import PlanSection from "@/components/PlanSection";
import { handlePlanChange } from "@/helpers/subscriptionHelpers";
import { useAuth } from "@/Providers/AuthProvider";

const UpdatePlanPage = () => {
	const { user } = useAuth();

	return (
		<div className="border-t border-[#999]">
			<PlanSection
				handleClickPlan={(priceId: string) => handlePlanChange(user, priceId)}
				selectedPlan={user?.plan}
				isUpdatePlan
			/>
		</div>
	);
};
export default UpdatePlanPage;
