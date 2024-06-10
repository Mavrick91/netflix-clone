"use client";

import classNames from "classnames";
import { ReactNode } from "react";

import useClickOutside from "@/hooks/useClickOutside";

import LinkComponent from "../LinkComponent";

type MainDropdownItem = {
	id: string;
	name: string | ReactNode;
};

type MainDropdownProps = {
	items: MainDropdownItem[];
	label: string;
	onChange?: (value: string) => void;
	numberOfColumn?: number;
};

const MainDropdown = ({
	items,
	label,
	onChange,
	numberOfColumn = 1,
}: MainDropdownProps) => {
	const { buttonRef, dropdownRef, toggleDropdown, isDropdownOpen } =
		useClickOutside();

	const isLink = (id: string) => {
		return id.startsWith("http") || id.startsWith("/");
	};

	const handleClick = (value: string) => {
		if (onChange) {
			toggleDropdown();
			onChange(value);
		}
	};

	return (
		<div className="relative z-[1000] flex w-full ">
			<button
				type="button"
				ref={buttonRef}
				onClick={toggleDropdown}
				className={classNames(
					"text-white border transition-all relative border-white pr-7 lg:pr-14 h-auto lg:py-1 pl-2 lg:font-bold text-sm lg:text-lg bg-black hover:bg-transparent",
					{
						"bg-transparent": isDropdownOpen,
					},
				)}
			>
				{label}
				<div className="arrow-down right-[10px] top-[44%]" />
			</button>

			{isDropdownOpen && (
				<div
					ref={dropdownRef}
					className="absolute left-0 top-full z-50 flex bg-black py-1 text-sm text-white"
				>
					<ul
						style={{
							display: "grid",
							gridTemplateColumns: `repeat(${numberOfColumn}, 1fr)`,
						}}
					>
						{items.map((item) => (
							<li
								key={item.id}
								className="col-span-1 whitespace-nowrap px-3 py-1 text-sm lg:text-lg"
							>
								{isLink(item.id) ? (
									<LinkComponent
										href={item.id}
										className="underline-offset-2 hover:underline"
									>
										{item.name}
									</LinkComponent>
								) : (
									<button
										onClick={() => handleClick(item.id)}
										className="underline-offset-2 hover:underline"
									>
										{item.name}
									</button>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MainDropdown;
