"use client";

import FormInput from "@/components/input/FormInput";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import React from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

const PLANS = [
	{
		title: "Premium",
		subTitle: "4K + HDR",
		background: "radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
		advantages: [
			{ title: "Monthly price", description: "US$22.99" },
			{ title: "Video and sound quality", description: "Best" },
			{ title: "Resolution", description: "4K (Ultra HD) + HDR" },
			{ title: "Spatial audio (immersive sound)", description: "Included" },
			{ title: "Supported devices", description: "TV, computer, mobile phone, tablet" },
			{ title: "Devices your household can watch at the same time", description: "4" },
			{ title: "Download devices", description: "6" },
			{ title: "Adverts", description: "No adverts" },
		],
	},
	{
		title: "Standard",
		subTitle: "1080p",
		background: "radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
		advantages: [
			{ title: "Monthly price", description: "US$15.49" },
			{ title: "Video and sound quality", description: "Good" },
			{ title: "Resolution", description: "1080p (Full HD)" },
			{ title: "Supported devices", description: "TV, computer, mobile phone, tablet" },
			{ title: "Devices your household can watch at the same time", description: "2" },
			{ title: "Download devices", description: "2" },
			{ title: "Adverts", description: "No adverts" },
		],
	},
	{
		title: "Standard with adverts",
		subTitle: "1080p",
		background: "radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
		advantages: [
			{ title: "Monthly price", description: "US$6.99" },
			{ title: "Video and sound quality", description: "Good" },
			{ title: "Resolution", description: "1080p (Full HD)" },
			{ title: "Supported devices", description: "TV, computer, mobile phone, tablet" },
			{ title: "Devices your household can watch at the same time", description: "2" },
			{ title: "Download devices", description: "2" },
			{ title: "Adverts", description: "A few advert breaks" },
		],
	},
];

const Step1 = () => {
	const { watch, setValue } = useFormContext();

	const selectedPlan = watch("plan-select");

	return (
		<div>
			<div className="mb-2 mt-6">
				<span className="text-xs">
					STEP <b>1</b> OF <b>3</b>
				</span>
				<h1 className="mb-3 text-3xl font-medium">Choose the plan that’s right for you</h1>
			</div>

			<div className="flex gap-3">
				{PLANS.map((plan, index) => (
					<div
						role="button"
						onClick={() => setValue("plan-select", `${index}`)}
						key={plan.title}
						className="w-[333px] rounded-[18px] border border-[#808080b3] transition-all"
						style={{
							boxShadow: selectedPlan === `${index}` ? "rgba(0, 0, 0, 0.25) 0px 4px 10px 0px" : "#fff 0px 0px 0px 0px",
						}}
					>
						<FormInput name="plan-select">
							<FormInput.Radio value={`${index}`} className="absolute size-px" id={`plan-select-${index}`} />
						</FormInput>
						<label
							className="m-2 flex flex-col rounded-[8px] px-4 py-3 font-medium text-primary-white"
							htmlFor={`plan-select-${index}`}
							style={{
								background: plan.background,
							}}
						>
							<span className="text-lg">{plan.title}</span>
							<span className="text-sm">{plan.subTitle}</span>

							<motion.span
								className="self-end"
								initial="hidden"
								animate={selectedPlan === `${index}` ? "visible" : "hidden"}
								variants={{
									hidden: { opacity: 0, scale: 0 },
									visible: { opacity: 1, scale: 1 },
								}}
								transition={{ duration: 0.5 }}
							>
								<Icon icon="carbon:checkmark-filled" />
							</motion.span>
						</label>
						<div>
							<ul className="my-4 px-6">
								{plan.advantages.map((advantage, index) => (
									<li key={advantage.title} className="border-b border-[#80808066] py-3 last:border-none">
										<div className="flex flex-col">
											<div className="text-[13px] font-medium text-[#767676]">{advantage.title}</div>
											<div
												className={classNames("font-medium text-[#000000b3]", {
													"text-sm": index !== 0,
													"text-base": index === 0,
												})}
											>
												{advantage.description}
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Step1;
