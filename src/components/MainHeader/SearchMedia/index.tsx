import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import MagnifyingGlassIcon from "@/assets/images/svg/MagnifyingGlassIcon";

const searchSchema = z.object({
	query: z.string().min(1, "Search term is required"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

const SearchMedia = () => {
	const searchParams = useSearchParams();
	const queryParams = searchParams.get("q");
	const [displaySearch, setDisplaySearch] = useState(!!queryParams);
	const [animationComplete, setAnimationComplete] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const isSearchRoute = pathname === "/search";

	const { register, handleSubmit, setFocus } = useForm<SearchFormValues>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			query: queryParams || "",
		},
	});

	const onSubmit = async (data: SearchFormValues) => {
		router.push(`/search?q=${data.query}`);
	};

	if (!isSearchRoute && !!queryParams) router.replace("/browse");

	return (
		<div className="text-white">
			<AnimatePresence onExitComplete={() => setAnimationComplete(false)}>
				{displaySearch && (
					<motion.div
						className="relative flex items-center border bg-black/75 px-2 py-1"
						initial={{ width: queryParams ? 255 : 50 }}
						animate={{ width: 255 }}
						exit={{ width: 50 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						onAnimationComplete={() => {
							setAnimationComplete(true);
							setFocus("query");
						}}
					>
						<MagnifyingGlassIcon className="shrink-0" />
						<form onSubmit={handleSubmit(onSubmit)} className="grow">
							<input
								autoFocus
								placeholder="Movies, tv show, peoples..."
								className="w-full bg-transparent py-1 pl-2 text-sm leading-3 focus-visible:outline-none"
								{...register("query")}
								onBlur={() => {
									if (!isSearchRoute) {
										setDisplaySearch(false);
									}
								}}
							/>
							<button type="submit" className="sr-only">
								Submit
							</button>
						</form>
					</motion.div>
				)}
			</AnimatePresence>
			{!displaySearch && !animationComplete && (
				<button type="button" onClick={() => setDisplaySearch(true)}>
					<MagnifyingGlassIcon />
				</button>
			)}
		</div>
	);
};

export default SearchMedia;
