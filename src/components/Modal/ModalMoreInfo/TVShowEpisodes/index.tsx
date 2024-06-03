import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useState } from "react";

import { getTVShowEpisodesBySeason } from "@/actions/tmdb";
import BorderExpand from "@/components/BorderExpand";
import ImageTMDB from "@/components/ImageTMDB";
import MainDropdown from "@/components/MainDropdown";
import { InfoParsedTVShow } from "@/types/InfoParsed";

const TVShowEpisodes = ({ infoParsed }: { infoParsed: InfoParsedTVShow }) => {
	const [selectedSeason, setSelectedSeason] = useState(1);
	const [isCollapsed, setIsCollapsed] = useState(true);

	const { data: season } = useQuery({
		queryKey: ["getTVShowEpisodesBySeason", infoParsed.showId, selectedSeason],
		queryFn: () => getTVShowEpisodesBySeason(infoParsed.showId, selectedSeason),
	});

	const hasAtLeast11Episodes = (season?.episodes || []).length >= 11;

	return (
		<div className="mb-24 flex flex-col">
			<div className="mb-5 mt-12 flex w-full items-center justify-between">
				<h3 className="text-2xl font-bold text-white">Episodes</h3>
				<div>
					<MainDropdown
						items={infoParsed.seasons.map((season, index) => ({
							id: `${season.id}`,
							name: `Season ${season.seasonNumber} (${season.episodeCount})`,
						}))}
						label={`Season ${selectedSeason}`}
					/>
				</div>
			</div>

			<div
				className={classNames(
					"grid grid-cols-1 transition-all overflow-hidden",
					{
						"max-h-[1160px]": isCollapsed,
						"max-h-[9960px]": !isCollapsed,
					},
				)}
			>
				{season?.episodes.map((episode) => (
					<button
						type="button"
						key={episode.id}
						className="col-span-1 flex items-center gap-4 border-b border-[#404040] p-4 text-left hover:bg-[#333]"
					>
						<div className="mx-5 w-[26px] shrink-0 text-2xl text-[#d2d2d2]">
							{episode.episode_number}
						</div>
						<ImageTMDB
							className="h-[83px] w-[148px] shrink-0 rounded"
							image={episode.still_path || season.poster_path}
							alt={""}
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
