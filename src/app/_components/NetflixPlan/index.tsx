"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

import PopcornIcon from "@/assets/images/svg/PopcornIcon";

const NetflixPlan = () => {
	return (
		<section
			className="absolute z-20 w-full -translate-y-1/2"
			aria-labelledby="netflix-plan-heading"
		>
			<div
				className="relative flex items-center justify-center rounded-md p-2 lg:mx-20 lg:p-6"
				style={{
					background:
						"radial-gradient( 51.39% 511.66% at 47.68% -217.91%, #ff9900 0%, #e50914 17.27%, #0e1b4f 79.44%, #000413 100% )",
					boxShadow: "0px -8px 25px rgba(0, 0, 0, 0.5)",
				}}
			>
				<PopcornIcon className="hidden sm:block" aria-hidden="true" />
				<div className="text-sm text-primary-white sm:pl-8 lg:text-xl">
					<h2 id="netflix-plan-heading" className="font-medium">
						The Netflix you love for just $6.99.
					</h2>
					<p className="mb-2 mt-1">Get the Standard with ads plan.</p>
					<Link
						href="/signup"
						className="flex items-center text-[#448ef4] underline-offset-2 hover:underline"
						aria-label="Learn more about the Netflix plan"
					>
						Learn More
						<Icon icon="bx:chevron-right" className="ml-2 text-2xl" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NetflixPlan;
