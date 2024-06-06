"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { getSearchMulti } from "@/actions/tmdb";
import { getMediaFiltered } from "@/utils/media";

import DisplaySearchMedia from "./_components/DisplaySearchMedia";

const SearchPage = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");
	const containerRef = useRef<HTMLDivElement>(null);
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["search", debouncedQuery],
			queryFn: async ({ pageParam = 1 }) =>
				getSearchMulti(debouncedQuery!, pageParam),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : null,
			initialPageParam: 1,
		});

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	const handleScroll = useCallback(() => {
		if (!containerRef.current || !hasNextPage || isFetchingNextPage) return;

		const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

		if (scrollHeight - scrollTop <= clientHeight * 1.5) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);

			return () => {
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, [handleScroll]);

	return (
		<div ref={containerRef} className="h-screen overflow-y-auto px-[4%] pt-36">
			<div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-y-11 md:gap-y-14 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
				{data &&
					data.pages.map((page) => {
						const mediaFiltered = getMediaFiltered(page.results);
						return (
							<DisplaySearchMedia key={page.page} medias={mediaFiltered} />
						);
					})}
			</div>
		</div>
	);
};

export default SearchPage;
