"use client";

import PopcornIcon from "@/assets/images/svg/PopcornIcon";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const NetflixPlan = () => {
	return (
		<div className="absolute z-20 w-full -translate-y-1/2">
			<div
				className="relative mx-20 flex justify-center rounded-md p-6"
				style={{
					background: "radial-gradient( 51.39% 511.66% at 47.68% -217.91%, #ff9900 0%, #e50914 17.27%, #0e1b4f 79.44%, #000413 100% )",
					boxShadow: "0px -8px 25px rgba(0, 0, 0, 0.5)",
				}}
			>
				<PopcornIcon />
				<div className="pl-8 text-primary-white">
					<p className="text-xl font-medium">The Netflix you love for just $6.99.</p>
					<p className="mb-2 mt-1">Get the Standard with ads plan.</p>
					<Link href="/signup" className="flex items-center text-[#448ef4] underline-offset-2 hover:underline">
						Learn More
						<Icon icon="bx:chevron-right" className="ml-2 text-2xl" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NetflixPlan;
