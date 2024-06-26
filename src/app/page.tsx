import { buttonVariants } from "@/components/Button";
import ImageClient from "@/components/ImageClient";
import LinkComponent from "@/components/LinkComponent";
import NetflixLogo from "@/components/NetflixLogo";
import Separator1 from "@/components/Separator1";

import Category1 from "./_components/Category1";
import Category2 from "./_components/Category2";
import FAQ from "./_components/FAQ";
import NetflixPlan from "./_components/NetflixPlan";

export default function Home() {
	return (
		<div>
			<div
				className="relative flex min-h-[30rem] flex-col lg:min-h-[44rem]"
				aria-labelledby="home-heading"
			>
				<ImageClient
					priority
					fill
					src="/images/background-signin.jpg"
					alt="Background image for sign-in"
					className="z-0"
				/>
				<div
					className="absolute inset-0 z-10 bg-black/40"
					style={{
						backgroundImage:
							"linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)",
					}}
				/>
				<header className="netflix-container relative z-10 mx-auto w-full px-8 py-6 text-primary-white">
					<div className="flex items-center justify-between">
						<NetflixLogo />
						<LinkComponent
							href="/login"
							prefetch
							className={buttonVariants({ size: "sm" })}
						>
							Sign In
						</LinkComponent>
					</div>
				</header>

				<div className="relative z-10 mx-8 flex h-full grow flex-col items-center justify-center gap-4 text-center text-primary-white">
					<h1 id="home-heading" className="text-[29px] font-bold md:text-5xl">
						Unlimited movies, TV shows, and more
					</h1>
					<p className="text-lg lg:text-2xl">Watch anywhere. Cancel anytime.</p>
				</div>
			</div>
			<NetflixPlan />
			<Category1 />
			<Separator1 />
			<Category2 />
			<Separator1 />
			<FAQ />
		</div>
	);
}
