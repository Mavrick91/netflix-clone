"use client";

import { useSuspenseQueries } from "@tanstack/react-query";
import { useMemo } from "react";

import {
	getDetailsMovieBannerMedia,
	getDetailsTVShowBannerMedia,
	getMoviesRecommendations,
	getTVShowsRecommendations,
} from "@/actions/tmdb";
import { InfoParsed, InfoParsedSchema } from "@/types/InfoParsed";
import {
	mapMovieToInfoParsed,
	mapTVShowToInfoParsed,
} from "@/utils/mapBannerMedia";
import { isDetailsMovie } from "@/utils/media";
import { isInfoParsedMovie } from "@/utils/utils";

import Content from "./Content";
import Header from "./Header";
import InfoSection from "./InfoSection";
import MoreLikeThis from "./MoreLikeThis";
import TVShowEpisodes from "./TVShowEpisodes";

type ModalInfoProps = {
	mediaId: number;
	mediaType: "movie" | "tv";
};

const ModalMoreInfo: React.FC<ModalInfoProps> = ({ mediaId, mediaType }) => {
	const [detailsMedia, recommendations] = useSuspenseQueries({
		queries: [
			{
				queryKey: ["media", "details", mediaId],
				queryFn: async () =>
					mediaType === "movie"
						? getDetailsMovieBannerMedia(mediaId)
						: getDetailsTVShowBannerMedia(mediaId),
			},
			{
				queryKey: ["media", "recommendation", mediaId],
				queryFn: async () =>
					mediaType === "movie"
						? getMoviesRecommendations(mediaId)
						: getTVShowsRecommendations(mediaId),
			},
		],
	});

	const infoParsed: InfoParsed | null = useMemo(() => {
		try {
			if (isDetailsMovie(detailsMedia.data)) {
				return InfoParsedSchema.parse(mapMovieToInfoParsed(detailsMedia.data));
			} else {
				return InfoParsedSchema.parse(mapTVShowToInfoParsed(detailsMedia.data));
			}
		} catch (e) {
			throw Error("This media does not exist anymore: 345");
		}
	}, [detailsMedia]);

	return (
		<div className="max-w-[939px] overflow-hidden rounded-t">
			<Header bannerMedia={detailsMedia.data} />
			<div className="bg-[#131313] px-4 sm:px-6 md:px-8 lg:px-10">
				<Content infoParsed={infoParsed} />
				{!isInfoParsedMovie(infoParsed) && (
					<TVShowEpisodes infoParsed={infoParsed} />
				)}
				{!!recommendations.data.total_results && (
					<MoreLikeThis mediaRecommendation={recommendations.data.results} />
				)}
				<InfoSection infoParsed={infoParsed} />
			</div>
		</div>
	);
};

export default ModalMoreInfo;
