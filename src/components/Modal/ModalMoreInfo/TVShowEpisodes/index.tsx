import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { getTVShowEpisodesBySeason } from "@/actions/tmdb";
import LoadingSpinner from "@/assets/images/svg/LoadingSpinner";
import BorderExpand from "@/components/BorderExpand";
import ImageTMDB from "@/components/ImageTMDB";
import SecondaryDropdown from "@/components/SecondaryDropdown";
import useDynamicHeight from "@/hooks/useDynamicHeight";
import { InfoParsedTVShow } from "@/types/InfoParsed";

const TVShowEpisodes = ({ infoParsed }: { infoParsed: InfoParsedTVShow }) => {
	const [selectedSeason, setSelectedSeason] = useState<number>(1);
	const [isCollapsed, setIsCollapsed] = useState(true);

	const { data: season, isFetching } = useQuery({
		queryKey: ["getTVShowEpisodesBySeason", infoParsed.showId, selectedSeason],
		queryFn: () => getTVShowEpisodesBySeason(infoParsed.showId, selectedSeason),
		staleTime: 60 * 60 * 6000, // 6 hours
	});

	const { itemRef, collapsedHeight, totalHeight } =
		useDynamicHeight<HTMLButtonElement>(season?.episodes || [], 10);

	const hasAtLeast11Episodes = useMemo(
		() => (season?.episodes || []).length >= 11,
		[season],
	);

	const seasonYear = useMemo(() => {
		if (season) {
			const date = new Date(season.air_date);
			return date.getFullYear();
		}
		return "";
	}, [season]);

	const handleSeasonChange = (id: string) => setSelectedSeason(Number(id));

	const renderSeasonDropdownItems = () =>
		infoParsed.seasons
			.filter((season) => season.seasonNumber >= 1)
			.map((season) => ({
				id: `${season.seasonNumber}`,
				name: (
					<div className="grid grid-cols-2 items-center gap-2 text-left">
						<h2 className="col-span-1 text-sm md:text-base">
							Season {season.seasonNumber}
						</h2>
						<span className="col-span-1 text-left text-[13px]">
							({season.episodeCount} Episodes)
						</span>
					</div>
				),
			}));

	return (
		<div className="mb-24 flex flex-col">
			<div className="mb-5 mt-12 flex w-full items-center justify-between">
				<h3 className="text-2xl font-bold text-white">Episodes</h3>
				<div>
					<SecondaryDropdown
						handleChange={handleSeasonChange}
						items={renderSeasonDropdownItems()}
						label={`Season ${selectedSeason}`}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 overflow-hidden">
				<p className="flex items-center gap-1 text-sm font-medium text-white">
					<span>Season {selectedSeason}:</span>
					{season && (
						<span className="flex text-[13px] font-light">
							{season.vote_average} ☆ • {seasonYear}
						</span>
					)}
				</p>
				{isFetching ? (
					<div className="my-3 flex items-center justify-center">
						<LoadingSpinner className="size-10 text-white" />
					</div>
				) : (
					<div
						className="transition-all"
						style={{
							maxHeight: isCollapsed
								? `${collapsedHeight}px`
								: `${totalHeight}px`,
						}}
					>
						{season?.episodes.map((episode, index) => (
							<button
								type="button"
								key={episode.id}
								ref={index === 0 ? itemRef : null}
								className="col-span-1 flex w-full flex-col gap-4 border-b border-[#404040] p-4 text-left hover:bg-[#333] md:flex-row md:items-center"
							>
								<div className="mx-5 hidden w-[26px] shrink-0 text-2xl text-[#d2d2d2] md:block">
									{episode.episode_number}
								</div>
								<ImageTMDB
									className="h-[140px] w-full shrink-0 rounded md:h-[73px] md:w-[130px]"
									image={episode.still_path || season.poster_path || ""}
									imageProps={{
										fill: true,
										priority: true,
										alt: episode.name || "",
									}}
								/>
								<div className="flex flex-col">
									<div className="mb-3 text-white">{episode.name}</div>
									{episode.overview && (
										<div className="line-clamp-2 text-sm text-[#D2D2D2]">
											{episode.overview}
										</div>
									)}
								</div>
							</button>
						))}
					</div>
				)}
			</div>
			{hasAtLeast11Episodes && (
				<BorderExpand
					mediaType="tv"
					onClick={() => setIsCollapsed(!isCollapsed)}
					isCollapsed={isCollapsed}
				/>
			)}
		</div>
	);
};

export default TVShowEpisodes;
