"use client";

import { Icon } from "@iconify/react";
import classNames from "classnames";
import React, { ReactNode, useState } from "react";

type Props = {
  question: string;
  answer: string | ReactNode;
};
const FAQItem = ({ question, answer }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="w-full">
      <button
        className="flex w-full items-center justify-between bg-[#2d2d2d] p-6 text-left transition hover:bg-[#414141]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{question}</h3>
        <Icon
          icon={isOpen ? "material-symbols-light:close" : "ph:plus-light"}
          className="size-9"
        />
      </button>
      <div
        className={classNames(
          "max-h-0 overflow-hidden px-6 bg-[#2d2d2d] border-t border-black transition-all",
          {
            "": !isOpen,
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
