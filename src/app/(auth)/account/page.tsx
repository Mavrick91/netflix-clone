"use client";

import { format } from "date-fns";

import MemeberSinceIcon from "@/assets/images/svg/MemeberSinceIcon";
import MainHeader from "@/components/MainHeader";
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
			<MainHeader />
			<div className="h-full bg-[#f3f3f3] p-4 pt-14 sm:px-14 sm:pt-16 lg:pt-24">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col sm:flex-row sm:gap-3 md:pb-4">
						<h1 className="text-2xl text-[#333] md:text-4xl">Account</h1>
						<p className="mb-3 mt-1 flex items-center gap-2 text-[13px] font-bold text-[#555] md:m-0">
							<MemeberSinceIcon /> Member Since{" "}
							{format(new Date(user.metadata.creationTime!), "MMMM yyyy")}
						</p>
					</div>

					<div className="flex flex-col gap-1 sm:gap-0">
						<MembershipBilling user={user} />
						<PlanDetails />
					</div>
				</div>
			</div>
		</>
	);
};

export default AccountPage;
