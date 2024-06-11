"use client";

import QualityHDIcon from "@/assets/images/svg/QualityHDIcon";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";
import { useAuth } from "@/Providers/AuthProvider";

import LinkComponent from "../LinkComponent";

type PlanDetailsProps = {};

const PlanDetails = ({}: PlanDetailsProps) => {
	const { user } = useAuth();

	return (
		<ProfileSectionLayout title="PLAN DETAILS">
			<div className="flex flex-col justify-between sm:flex-row sm:items-center md:col-span-5">
				<div className="mb-2 flex items-center gap-3 sm:mb-0">
					<p className="font-medium text-[#333]">
						{user?.plan ? "Standard" : "-"}
					</p>
					<QualityHDIcon className="size-10" />
				</div>

				<LinkComponent
					href="/account/update-plan"
					className="border-t border-[#ccc] pb-1 pt-4 font-light sm:hidden"
				>
					Change plan
				</LinkComponent>

				<LinkComponent
					href="/account/update-plan"
					className="hidden text-[#0073e6] underline-offset-2 hover:underline sm:block"
				>
					Change plan
				</LinkComponent>
			</div>
		</ProfileSectionLayout>
	);
};

export default PlanDetails;
