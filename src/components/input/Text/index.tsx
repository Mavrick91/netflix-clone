import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { InputHTMLAttributes, useState } from "react";

type Props = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Text = ({ label, ...props }: Props) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="group relative inline-flex flex-wrap align-top">
			<label
				className={classNames(
					"absolute inset-x-4 top-3.5 z-10 select-none truncate whitespace-nowrap text-[#ffffffc7] transition-all group-focus-within:top-2 group-focus-within:text-xs",
					{
						"!top-2 !text-xs": props.value,
					}
				)}
			>
				{label}
			</label>
			<div className="relative z-20 inline-flex w-full min-w-[12.5rem] items-center justify-center gap-2 fill-current p-0 text-left text-base font-normal text-white">
				<input
					{...props}
					type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
					autoComplete="off"
					className={classNames(
						"min-h-4 w-full min-w-4 rounded-sm border border-[#808080b3] bg-transparent px-4 pb-2 pt-6 text-sm focus:ring-1 focus:ring-white focus-visible:outline-none",
						{
							"pr-10": props.type === "password",
						}
					)}
				/>
				{props.type === "password" && (
					<div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
						<button onClick={() => setShowPassword(!showPassword)} type="button">
							<Icon icon={showPassword ? "ph:eye-slash" : "ph:eye"} />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Text;
