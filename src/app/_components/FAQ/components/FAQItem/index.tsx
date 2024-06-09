"use client";

import { Icon } from "@iconify/react";
import classNames from "classnames";
import { ReactNode, useState } from "react";

type Props = {
	question: string;
	answer: string | ReactNode;
};

const FAQItem = ({ question, answer }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);

	return (
		<li className="w-full">
			<button
				className="flex w-full items-center justify-between bg-[#2d2d2d] p-6 text-left transition hover:bg-[#414141]"
				onClick={toggleOpen}
				aria-expanded={isOpen}
				aria-controls={`faq-answer-${question}`}
			>
				<h3 className="text-lg lg:text-xl">{question}</h3>
				<Icon
					icon={isOpen ? "material-symbols-light:close" : "ph:plus-light"}
					className="size-9"
				/>
			</button>
			<div
				id={`faq-answer-${question}`}
				className={classNames(
					"max-h-0 overflow-hidden px-6 bg-[#2d2d2d] border-t border-black transition-all",
					{
						"p-6 max-h-[1000px]": isOpen,
					},
				)}
			>
				{answer}
			</div>
		</li>
	);
};

export default FAQItem;
