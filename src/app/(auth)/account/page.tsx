"use client";

import MembershipBilling from "@/components/MembershipBilling";
import PlanDetails from "@/components/PlanDetails";
import { useAuth } from "@/Providers/AuthProvider";

type AccountPageProps = {};

const AccountPage = ({}: AccountPageProps) => {
	const { user } = useAuth();

	if (!user) {
		throw new Error("User not found");
	}

	return (
		<>
			<div className="flex flex-col gap-1 sm:gap-0">
				<MembershipBilling user={user} />
				<PlanDetails />
			</div>
		</>
	);
};

export default AccountPage;
