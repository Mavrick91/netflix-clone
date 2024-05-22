import ImageClient from "@/components/ImageClient";
import Separator1 from "@/components/Separator1";
import Link from "next/link";
import Category1 from "./_components/Category1";
import Category2 from "./_components/Category2";
import FAQ from "./_components/FAQ";
import NetflixPlan from "./_components/NetflixPlan";
import { buttonVariants } from "@/components/Button";
import NetflixLogo from "@/components/NetflixLogo";

export default function Home() {
	return (
		<div>
			<div className="relative flex min-h-[44rem] flex-col">
				<ImageClient fill src="/images/background-signin.jpg" alt="background signin" className="z-0" />
				<div
					className="absolute inset-0 z-10 bg-black/40"
					style={{
						backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%)",
					}}
				/>
				<header className="netflix-container relative z-10 mx-auto w-full px-8 py-6 text-primary-white">
					<div className="flex items-center justify-between">
						<NetflixLogo />
						<Link href="/login" className={buttonVariants({ size: "sm" })}>
							Sign In
						</Link>
					</div>
				</header>

				<div className="relative z-10 flex h-full grow flex-col items-center justify-center gap-4 text-primary-white">
					<h1 className="text-5xl font-bold">Unlimited movies, TV shows, and more</h1>
					<p className="text-2xl">Watch anywhere. Cancel anytime.</p>
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
