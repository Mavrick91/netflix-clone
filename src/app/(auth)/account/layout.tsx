"use client";

import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";

import ChevronIcon from "@/assets/images/svg/ChevronIcon";
import MemeberSinceIcon from "@/assets/images/svg/MemeberSinceIcon";
import MainHeader from "@/components/MainHeader";
import { useAuth } from "@/Providers/AuthProvider";

export default function AccountLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<>
			<MainHeader />
			<div className="min-h-full bg-[#f3f3f3] p-4 pt-14 sm:px-14 sm:pt-16 lg:pt-24">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-col pb-4 sm:flex-row sm:gap-3">
						<h1 className="flex items-center gap-3 text-2xl text-[#333] md:text-4xl">
							{pathname !== "/account" && (
								<button type="button" onClick={() => router.back()}>
									<ChevronIcon className="rotate-90" />
								</button>
							)}
							Account
						</h1>
						<p className="mt-1 flex items-center gap-2 text-[13px] font-bold text-[#555] sm:m-0">
							<MemeberSinceIcon /> Member Since{" "}
							{format(new Date(user!.metadata.creationTime!), "MMMM yyyy")}
						</p>
					</div>
					{children}
				</div>
			</div>
		</>
	);
}
