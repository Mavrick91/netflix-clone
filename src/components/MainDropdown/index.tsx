"use client";

import classNames from "classnames";
import { ReactNode } from "react";

import LinkComponent from "@/components/LinkComponent";
import useClickOutside from "@/hooks/useClickOutside";

type MainDropdownItem = {
	id: string;
	name: string | ReactNode;
};

type MainDropdownProps = {
	items: MainDropdownItem[];
	label: string;
};

const MainDropdown = ({ items, label }: MainDropdownProps) => {
	const { buttonRef, dropdownRef, toggleDropdown, isDropdownOpen } =
		useClickOutside();

	return (
		<div className="relative z-[1000] ml-5 flex w-full lg:ml-10">
			<button
				type="button"
				ref={buttonRef}
				onClick={toggleDropdown}
				className={classNames(
					"text-white border transition-all relative border-white pr-7 text-[8px] lg:pr-14 h-auto lg:py-1 pl-2 lg:font-bold text-sm lg:text-lg bg-black hover:bg-transparent",
					{
						"bg-transparent": isDropdownOpen,
					},
				)}
			>
				{label}
				<div className="arrow-down" />
			</button>

			{isDropdownOpen && (
				<div
					ref={dropdownRef}
					className="absolute left-0 top-full z-50 flex w-max max-w-[622px] whitespace-nowrap bg-black py-1 text-sm text-white"
				>
					<ul className="grid grid-cols-1 py-2 lg:grid-cols-3">
						{items.map((item) => (
							<LinkComponent
								href={`${item.id}`}
								className="col-span-1 whitespace-nowrap px-3 py-1 text-sm underline-offset-2 hover:underline lg:text-lg"
								key={item.id}
							>
								{item.name}
							</LinkComponent>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MainDropdown;
