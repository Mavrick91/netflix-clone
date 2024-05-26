import { Icon } from "@iconify/react";
import React from "react";

const WarningError = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md bg-[#d89d31] p-4 text-black">
      <div className="flex items-center">
        <Icon
          icon="material-symbols:warning"
          className="mr-4 shrink-0 text-2xl text-black"
        />
        <div className="text-base">
          <span id="" data-uia="">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WarningError;
