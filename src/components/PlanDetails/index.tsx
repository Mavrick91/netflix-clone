"use client";

import { useCallback } from "react";

import { PLANS } from "@/constants/plan";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";
import { useAuth } from "@/Providers/AuthProvider";

import ImageClient from "../ImageClient";
import LinkComponent from "../LinkComponent";

type PlanDetailsProps = {};

const PlanDetails = ({}: PlanDetailsProps) => {
	const { user } = useAuth();

	const getUserPlan = useCallback((plan: string) => {
		const userPlan = PLANS.find((p) => p.priceId === plan);

		return (
			<>
				<p className="flex flex-col gap-1 font-medium text-[#333]">
					<span>{userPlan?.title}</span> <span>{userPlan?.subTitle}</span>
				</p>
				<ImageClient
					src={
						plan === PLANS[0].priceId
							? "/images/4k-fullhd.png"
							: "/images/1080p-full-hd.png"
					}
					width={50}
					height={20}
					alt="plan icon"
				/>
			</>
		);
	}, []);

	return (
		<ProfileSectionLayout title="PLAN DETAILS">
			<div className="flex flex-col justify-between sm:flex-row sm:items-center md:col-span-5">
				<div className="mb-2 flex items-center gap-3 sm:mb-0">
					{user?.plan ? getUserPlan(user.plan) : "-"}
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
