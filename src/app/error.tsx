"use client"; // Error components must be Client Components

import classNames from "classnames";
import { useEffect } from "react";

import { buttonVariants } from "@/components/Button";
import ImageClient from "@/components/ImageClient";
import LinkComponent from "@/components/LinkComponent";
import MainHeader from "@/components/MainHeader";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<MainHeader isError />
			<div className="relative flex h-screen w-screen items-center justify-center">
				<ImageClient
					src="/images/bg-lost-in-space.png"
					alt="Lost in Space"
					fill
					priority
				/>

				<div className="error-radial-bg relative z-20 flex w-full flex-col text-center text-white">
					<h1
						style={{ textShadow: "0 1px 2px rgba(0,0,0,.57)" }}
						className="z-10 mb-1 text-3xl font-medium sm:mb-3 md:mb-5 lg:mb-6 lg:text-6xl"
					>
						Lost your way?
					</h1>
					<div className="z-10 flex w-1/2 flex-col items-center self-center text-center">
						<p
							className="mb-6 text-sm font-light lg:text-2xl"
							style={{ textShadow: "0 1px 2px rgba(0,0,0,.57)" }}
						>{`Sorry, we can't find that page. You'll find lots to explore on the home page.`}</p>
						<div>
							<LinkComponent
								href="/browse"
								className={classNames(
									"!font-semibold !text-base",
									buttonVariants({ variant: "white" }),
								)}
							>
								Netflix Home
							</LinkComponent>
						</div>
						<div className="mt-16 flex w-max items-center gap-3 border-l-2 border-red-500 p-3 text-left text-2xl">
							<p className="font-thin">Error</p>
							<p className="font-medium">{error.message}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
