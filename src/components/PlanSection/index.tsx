import { Icon } from "@iconify/react/dist/iconify.js";
import classNames from "classnames";
import { motion } from "framer-motion";

const PLANS = [
	{
		title: "Premium",
		subTitle: "4K + HDR",
		priceId: "price_1PQ4CrCLS8uiHXWL5Xqd1ht2",
		background:
			"radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
		advantages: [
			{ title: "Monthly price", description: "US$22.99" },
			{ title: "Video and sound quality", description: "Best" },
			{ title: "Resolution", description: "4K (Ultra HD) + HDR" },
			{ title: "Spatial audio (immersive sound)", description: "Included" },
			{
				title: "Supported devices",
				description: "TV, computer, mobile phone, tablet",
			},
			{
				title: "Devices your household can watch at the same time",
				description: "4",
			},
			{ title: "Download devices", description: "6" },
			{ title: "Adverts", description: "No adverts" },
		],
	},
	{
		title: "Standard",
		subTitle: "1080p",
		priceId: "price_1PQ4CtCLS8uiHXWLT1DrPx7V",
		background:
			"radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
		advantages: [
			{ title: "Monthly price", description: "US$15.49" },
			{ title: "Video and sound quality", description: "Good" },
			{ title: "Resolution", description: "1080p (Full HD)" },
			{
				title: "Supported devices",
				description: "TV, computer, mobile phone, tablet",
			},
			{
				title: "Devices your household can watch at the same time",
				description: "2",
			},
			{ title: "Download devices", description: "2" },
			{ title: "Adverts", description: "No adverts" },
		],
	},
	{
		title: "Standard with adverts",
		subTitle: "1080p",
		priceId: "price_1PQ4CvCLS8uiHXWL48i2lnuL",
		background:
			"radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)",
		advantages: [
			{ title: "Monthly price", description: "US$6.99" },
			{ title: "Video and sound quality", description: "Good" },
			{ title: "Resolution", description: "1080p (Full HD)" },
			{
				title: "Supported devices",
				description: "TV, computer, mobile phone, tablet",
			},
			{
				title: "Devices your household can watch at the same time",
				description: "2",
			},
			{ title: "Download devices", description: "2" },
			{ title: "Adverts", description: "A few advert breaks" },
		],
	},
];

type PlanSectionProps = {
	handleClickPlan: (priceId: string) => void;
	selectedPlan?: string;
	isUpdatePlan?: boolean;
};

const PlanSection = ({
	handleClickPlan,
	selectedPlan,
	isUpdatePlan = false,
}: PlanSectionProps) => {
	return (
		<section>
			<div className="mb-2 mt-6">
				<h1 className="mb-3 text-lg font-medium sm:text-2xl md:text-3xl lg:text-4xl">
					Choose the plan that’s right for you
				</h1>
			</div>

			<div className="grid grid-cols-12 gap-3">
				{PLANS.map((plan, index) => {
					const isSelected = selectedPlan === plan.priceId;
					const isDisabled = isUpdatePlan && isSelected;

					return (
						<button
							type="button"
							onClick={() => handleClickPlan(plan.priceId)}
							key={plan.title}
							aria-disabled={isDisabled}
							disabled={isDisabled}
							className={classNames(
								"col-span-12 flex w-[333px] flex-col rounded-[18px] border border-[#808080b3] text-left transition-all lg:col-span-6 xl:col-span-4",
								{
									"opacity-50": isDisabled,
									"box-shadow": isSelected
										? "rgba(0, 0, 0, 0.25) 0px 4px 10px 0px"
										: "none",
								},
							)}
						>
							<label
								className="m-2 flex flex-col self-stretch rounded-[10px] px-4 py-3 font-medium text-primary-white"
								htmlFor={`plan-select-${index}`}
								style={{ background: plan.background }}
							>
								<span className="text-lg">{plan.title}</span>
								<span className="text-sm">{plan.subTitle}</span>

								<motion.span
									className="self-end"
									initial="hidden"
									animate={isSelected ? "visible" : "hidden"}
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
									{plan.advantages.map((advantage, idx) => (
										<li
											key={advantage.title}
											className="border-b border-[#80808066] py-3 last:border-none"
										>
											<div className="flex flex-col">
												<div className="text-[13px] font-medium text-[#767676]">
													{advantage.title}
												</div>
												<div
													className={classNames(
														"font-medium text-[#000000b3]",
														{
															"text-sm": idx !== 0,
															"text-base": idx === 0,
														},
													)}
												>
													{advantage.description}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</button>
					);
				})}
			</div>
		</section>
	);
};

export default PlanSection;
