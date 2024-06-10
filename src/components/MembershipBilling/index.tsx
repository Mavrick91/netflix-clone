import { User } from "firebase/auth";

import { Button } from "@/components/Button";
import LinkComponent from "@/components/LinkComponent";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";

type MembershipBillingProps = {
	user: User;
};

const MembershipBilling = ({ user }: MembershipBillingProps) => {
	const subTitle = (
		<div className="mt-3 hidden flex-col sm:flex md:col-span-3">
			<Button
				className="text-black"
				style={{
					backgroundColor: "#e6e6e6",
					backgroundImage: "linear-gradient(180deg,#e6e6e6,#ddd)",
					boxShadow: "0 1px 0 rgba(0,0,0,.2)",
				}}
			>
				Cancel Membership
			</Button>
		</div>
	);

	return (
		<ProfileSectionLayout title="MEMBERSHIP & BILLING" subTitle={subTitle}>
			<div className="flex flex-col gap-3 sm:hidden">
				<p className="font-medium text-[#333]">{user.email}</p>
				<p className="text-[#737373]">Password: ********</p>
				<LinkComponent
					href="/account/update-email"
					className="border-t border-[#ccc] pb-1 pt-4 font-light"
				>
					Change account email
				</LinkComponent>
				<div className="border-t border-[#ccc] pb-1 pt-4 font-light">
					Change password
				</div>
			</div>

			<div className="mt-5 hidden w-full flex-col gap-3 sm:flex md:mt-0">
				<div className="flex items-center justify-between gap-10">
					<p className="break-all font-medium text-[#333]">{user.email}</p>
					<LinkComponent
						href="/account/update-email"
						className="whitespace-nowrap text-[#0073e6] underline-offset-2 hover:underline"
					>
						Change account email
					</LinkComponent>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-[#737373]">Password: ********</p>
					<LinkComponent
						href="/login"
						className="text-[#0073e6] underline-offset-2 hover:underline"
					>
						Change password
					</LinkComponent>
				</div>
			</div>
		</ProfileSectionLayout>
	);
};

export default MembershipBilling;
