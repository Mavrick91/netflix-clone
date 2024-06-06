"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

import { getSearchMulti } from "@/actions/tmdb";
import { MediaResults, MediaSearch } from "@/types";
import { getMediaFiltered } from "@/utils/media";

import DisplaySearchMedia from "../DisplaySearchMedia";

type SearchResultsProps = {
	results: MediaResults<MediaSearch>;
	q: string;
};

const SearchResults = ({ results, q }: SearchResultsProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ["search", q],
			queryFn: async ({ pageParam = 1 }) => getSearchMulti(q, pageParam),
			getNextPageParam: (lastPage) => {
				return lastPage.page !== lastPage.total_pages
					? lastPage.page + 1
					: null;
			},
			initialPageParam: 1,
			initialData: {
				pages: [results],
				pageParams: [1],
			},
		});

	const handleScroll = useCallback(() => {
		if (!containerRef.current || !hasNextPage || isFetchingNextPage) return;

		const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

		if (scrollHeight - scrollTop <= clientHeight * 1.5) {
			fetchNextPage();
		}
	}, [containerRef, fetchNextPage, hasNextPage, isFetchingNextPage]);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);

			return () => {
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, [containerRef, handleScroll]);

	return (
		<div ref={containerRef} className="h-screen overflow-y-auto px-[4%] pt-36">
			<div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-y-11 md:gap-y-14 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
				{data.pages.map((page) => {
					const mediaFiltered = getMediaFiltered(page.results);
					return <DisplaySearchMedia key={page.page} medias={mediaFiltered} />;
				})}
			</div>
			{isFetchingNextPage && <div>Loading more...</div>}
		</div>
	);
};

export default SearchResults;
