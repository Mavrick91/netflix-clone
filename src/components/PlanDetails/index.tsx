"use client";

import { useCallback } from "react";

import { PLANS } from "@/constants/plan";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import ProfileSectionLayout from "@/layout/ProfileSectionLayout";

import ImageClient from "../ImageClient";
import LinkComponent from "../LinkComponent";

const PlanDetails = () => {
	const { user } = useAuthenticatedUser();

	const getUserPlan = useCallback((plan: string) => {
		const userPlan = PLANS.find((p) => p.priceId === plan);

		return (
			<div className="flex items-center gap-3">
				<p className="flex shrink-0 flex-col gap-1 font-medium text-[#333]">
					<span>{userPlan?.title}</span> <span>{userPlan?.subTitle}</span>
				</p>
				<ImageClient
					src={
						plan === PLANS[0].priceId
							? "/images/4k-fullhd.png"
							: "/images/1080p-full-hd.png"
					}
					width={40}
					height={10}
					priority
					alt="plan icon"
					style={{ width: "100%", height: "auto" }}
				/>
			</div>
		);
	}, []);

	return (
		<ProfileSectionLayout title="PLAN DETAILS">
			<div className="flex flex-col justify-between sm:flex-row sm:items-center md:col-span-5">
				<div className="mb-2 flex items-center gap-5 sm:mb-0">
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
