"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSearchMulti } from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import { getMediaFiltered } from "@/utils/media";

import DisplaySearchMedia from "./_components/DisplaySearchMedia";

const SearchPage = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");
	const [debouncedQuery, setDebouncedQuery] = useState(query);
	const containerRef = useRef<HTMLDivElement>(null);

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

	const ensureScrollable = useCallback(() => {
		const container = containerRef.current;
		if (
			container &&
			container.childElementCount <= 20 &&
			hasNextPage &&
			!isFetchingNextPage
		) {
			fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	useEffect(() => {
		if (data) {
			ensureScrollable();
		}
	}, [data, ensureScrollable]);

	return (
		<>
			<MainHeader />
			<div className="px-[4%] pt-36">
				<InfiniteScroll
					dataLength={
						data ? data.pages.length * data.pages[0].results.length : 0
					}
					next={fetchNextPage}
					hasMore={hasNextPage}
					loader={<h4>Loading...</h4>}
					endMessage={<p>No more results</p>}
				>
					<div
						ref={containerRef}
						className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-y-11 md:gap-y-14 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8"
					>
						{data &&
							data.pages.map((page) => {
								const mediaFiltered = getMediaFiltered(page.results);
								return (
									<DisplaySearchMedia key={page.page} medias={mediaFiltered} />
								);
							})}
					</div>
				</InfiniteScroll>
			</div>
		</>
	);
};

export default SearchPage;
