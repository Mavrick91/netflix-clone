import { pick } from "lodash";

import { DetailsMovie, DetailsTVShow } from "@/types";
import { InfoParsedMovie, InfoParsedTVShow } from "@/types/InfoParsed";

export const mapMovieToInfoParsed = (
	bannerMedia: DetailsMovie,
): InfoParsedMovie => {
	const picked = pick(bannerMedia, [
		"runtime",
		"release_date",
		"overview",
		"imdb_id",
		"popularity",
		"original_title",
		"title",
		"original_language",
		"homepage",
		"budget",
		"revenue",
		"vote_average",
		"vote_count",
	]);
	return {
		type: "movie",
		...picked,
		releaseDate: picked.release_date,
		imdbId: picked.imdb_id,
		title: picked.original_title || picked.title,
		genres: bannerMedia.genres.map((item) => item.name),
		production_companies: bannerMedia.production_companies.map(
			(item) => item.name,
		),
		budget: new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(bannerMedia.budget),
		revenue: new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(bannerMedia.revenue),
		voteAverage: picked.vote_average,
		voteCount: picked.vote_count,
	} as InfoParsedMovie;
};

export const mapTVShowToInfoParsed = (
	bannerMedia: DetailsTVShow,
): InfoParsedTVShow => {
	const picked = pick(bannerMedia, [
		"episode_run_time",
		"first_air_date",
		"overview",
		"popularity",
		"original_name",
		"name",
		"original_language",
		"homepage",
		"vote_average",
		"vote_count",
	]);
	return {
		type: "tvshow",
		...picked,
		runtime: bannerMedia.episode_run_time.length
			? bannerMedia.episode_run_time[0]
			: null,
		showId: bannerMedia.id,
		releaseDate: picked.first_air_date,
		title: picked.original_name || picked.name,
		seasonTotal: bannerMedia.number_of_seasons,
		genres: bannerMedia.genres.map((item) => item.name),
		production_companies: bannerMedia.production_companies.map(
			(item) => item.name,
		),
		seasons: bannerMedia.seasons.map((item) => ({
			episodeCount: item.episode_count,
			id: item.id,
			seasonNumber: item.season_number,
		})),
		createBy: bannerMedia.created_by.map((item) => item.name),
		voteAverage: picked.vote_average,
		voteCount: picked.vote_count,
		status: bannerMedia.status,
	} as InfoParsedTVShow;
};
