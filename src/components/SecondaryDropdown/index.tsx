"use client";

import { ReactNode } from "react";

import useClickOutside from "@/hooks/useClickOutside";

type SecondaryDropdownItem = {
	id: string;
	name: string | ReactNode;
};

type SecondaryDropdownProps = {
	items: SecondaryDropdownItem[];
	label: string;
	handleChange: (id: string) => void;
};

const SecondaryDropdown = ({
	items,
	label,
	handleChange,
}: SecondaryDropdownProps) => {
	const { buttonRef, dropdownRef, toggleDropdown, isDropdownOpen } =
		useClickOutside();

	const handleClickChange = (id: string) => {
		handleChange(id);
		toggleDropdown();
	};

	return (
		<div className="relative z-[1000] flex w-full">
			<button
				type="button"
				ref={buttonRef}
				onClick={toggleDropdown}
				className="relative h-auto rounded border border-[#4D4D4D] bg-[#242424] pl-4 pr-7 text-lg  text-white transition-all lg:py-2 lg:pr-14 lg:text-lg lg:font-medium"
			>
				{label}
				<div className="arrow-down" />
			</button>

			{isDropdownOpen && (
				<div
					ref={dropdownRef}
					className="absolute right-0 top-full z-50 flex w-max translate-y-1 whitespace-nowrap border border-[#4D4D4D] bg-[#242424] py-1 text-sm text-white"
				>
					<ul className="grid grid-cols-1">
						{items.map((item) => (
							<button
								type="button"
								onClick={() => handleClickChange(item.id)}
								className="col-span-1 whitespace-nowrap px-3 py-2 hover:bg-[#424242]"
								key={item.id}
							>
								{item.name}
							</button>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SecondaryDropdown;
