import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import MagnifyingGlassIcon from "@/assets/images/svg/MagnifyingGlassIcon";
import useManageQueryParams from "@/hooks/useManageQueryParams";

const SearchMedia = () => {
	const searchParams = useSearchParams();
	const queryParams = searchParams.get("q");
	const [query, setQuery] = useState(queryParams || "");
	const [displaySearch, setDisplaySearch] = useState(!!queryParams);
	const [animationComplete, setAnimationComplete] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const { addQueryParams } = useManageQueryParams();

	const isSearchRoute = pathname === "/search";

	useEffect(() => {
		if (query && !isSearchRoute) {
			router.push(`/search?q=${query}`);
		} else if (!query && isSearchRoute) {
			router.push("/browse");
		}
	}, [addQueryParams, isSearchRoute, query, router]);

	if (!isSearchRoute && !!queryParams) router.replace("/browse");

	return (
		<>
			<AnimatePresence onExitComplete={() => setAnimationComplete(false)}>
				{displaySearch && (
					<motion.div
						className="relative flex items-center border bg-black/75 px-2 lg:py-1"
						initial={{ width: queryParams ? 255 : 50 }}
						animate={{ width: 255 }}
						exit={{ width: 50 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						onAnimationComplete={() => {
							setAnimationComplete(true);
						}}
					>
						<MagnifyingGlassIcon className="size-4 shrink-0 lg:size-6" />
						<div className="flex h-[22px] items-center lg:h-6">
							<input
								autoFocus
								placeholder="Movies, tv show, peoples..."
								className="w-full bg-transparent pl-2 text-[13px] leading-6 focus-visible:outline-none lg:py-1 lg:pl-2 lg:text-sm lg:leading-3"
								value={query}
								onChange={(e) => {
									addQueryParams({ q: e.target.value });
									setQuery(e.target.value);
								}}
								onBlur={() => {
									if (!isSearchRoute) {
										setDisplaySearch(false);
									}
								}}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			{!displaySearch && !animationComplete && (
				<button type="button" onClick={() => setDisplaySearch(true)}>
					<MagnifyingGlassIcon />
				</button>
			)}
		</>
	);
};

export default SearchMedia;
