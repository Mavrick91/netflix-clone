import { Icon } from "@iconify/react/dist/iconify.js";
import classNames from "classnames";
import { motion } from "framer-motion";

import { PLANS } from "@/constants/plan";

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
								"col-span-12 flex flex-col md:col-span-6 rounded-[18px] border border-[#808080b3] text-left transition-all lg:col-span-4",
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
							<ul className="my-4 w-full px-6">
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
												className={classNames("font-medium text-[#000000b3]", {
													"text-sm": idx !== 0,
													"text-base": idx === 0,
												})}
											>
												{advantage.description}
											</div>
										</div>
									</li>
								))}
							</ul>
						</button>
					);
				})}
			</div>
		</section>
	);
};

export default PlanSection;
