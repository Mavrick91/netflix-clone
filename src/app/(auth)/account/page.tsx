import DeleteAccount from "@/components/DeleteAccount";
import MembershipBilling from "@/components/MembershipBilling";
import PlanDetails from "@/components/PlanDetails";

const AccountPage = () => {
	return (
		<>
			<div className="flex flex-col gap-1 sm:gap-0">
				<MembershipBilling />
				<PlanDetails />
				<DeleteAccount />
			</div>
		</>
	);
};

export default AccountPage;
