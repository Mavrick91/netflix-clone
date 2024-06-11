import MembershipBilling from "@/components/MembershipBilling";
import PlanDetails from "@/components/PlanDetails";

type AccountPageProps = {};

const AccountPage = ({}: AccountPageProps) => {
	return (
		<>
			<div className="flex flex-col gap-1 sm:gap-0">
				<MembershipBilling />
				<PlanDetails />
			</div>
		</>
	);
};

export default AccountPage;
