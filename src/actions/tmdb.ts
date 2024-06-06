"use server";

import {
	Categories,
	DetailsMovie,
	DetailsTVShow,
	MediaResults,
	MediaSearch,
	MediaSection,
	Movie,
	TVShow,
} from "@/types";
import { DetailsSeason } from "@/types/details/DetailsSeason";
import tmdbFetch from "@/utils/tmdbFetch";
import { getRandomMedia } from "@/utils/utils";

export const getTrendingMovies = async (): Promise<MediaResults<Movie>> => {
	return tmdbFetch("/trending/movie/week");
};

export const getDetailsMovieBannerMedia = async (
	mediaId: number,
): Promise<DetailsMovie> => {
	return tmdbFetch(`/movie/${mediaId}`);
};

export const getDetailsTVShowBannerMedia = async (
	mediaId: number,
): Promise<DetailsTVShow> => {
	return tmdbFetch(`/tv/${mediaId}`);
};

export const getUpcomingMovies = async (): Promise<MediaResults<Movie>> => {
	const today = new Date().toISOString();
	const nextMonth = new Date(
		new Date().setMonth(new Date().getMonth() + 2),
	).toISOString();

	return tmdbFetch(
		"/discover/movie",
		{},
		{
			region: "US",
			"primary_release_date.gte": today,
			"primary_release_date.lte": nextMonth,
		},
	);
};

export const getAwardedMovies = async (): Promise<MediaResults<Movie>> => {
	return tmdbFetch("/movie/top_rated");
};

export const getBannerMovies = async (): Promise<MediaResults<Movie>> => {
	return tmdbFetch("/movie/now_playing");
};

export const getGenreTvShows = async (): Promise<Categories> => {
	return tmdbFetch("/genre/tv/list");
};

export const getGenreMovies = async (): Promise<Categories> => {
	return tmdbFetch("/genre/movie/list");
};

export const getTvShowsByGenre = async (
	genreId: string | null,
	extraParams?: Record<string, string>,
): Promise<MediaResults<TVShow>> => {
	return tmdbFetch(
		"/discover/tv",
		{},
		{ with_genres: `${genreId ? genreId : "10759"}`, ...extraParams },
	);
};

export const getMoviesByGenre = async (
	genreId: string | null,
	extraParams?: Record<string, string>,
): Promise<MediaResults<Movie>> => {
	return tmdbFetch(
		"/discover/movie",
		{},
		{ with_genres: `${genreId ? genreId : "28"}`, ...extraParams },
	);
};

export const getMoviesRecommendations = async (
	movieId: number,
): Promise<MediaResults<Movie>> => {
	return tmdbFetch(`/movie/${movieId}/recommendations`);
};

export const getTVShowsRecommendations = async (
	tvShowId: number,
): Promise<MediaResults<TVShow>> => {
	return tmdbFetch(`/tv/${tvShowId}/recommendations`);
};

export const fetchTVData = async (
	getBannerMedia: Promise<MediaResults<Movie>> | Promise<MediaResults<TVShow>>,
) => {
	const [
		bannerMedia,
		westernTVShows,
		koreanTVShows,
		familiarTVShows,
		getItOnTVShows,
	] = await Promise.all([
		getBannerMedia,
		getTvShowsByGenre("37"),
		getTvShowsByGenre(null, { with_origin_country: "KR" }),
		getTvShowsByGenre("18,35,10751", { sort_by: "popularity.desc" }),
		getTvShowsByGenre("10759"),
	]);

	const banner = getRandomMedia(bannerMedia.results) as TVShow;
	const mediaSections: MediaSection[] = [
		{ title: "Western TV Shows", data: westernTVShows.results },
		{ title: "Korean TV Shows", data: koreanTVShows.results },
		{ title: "Familiar TV Favorites", data: familiarTVShows.results },
		{ title: "Get In On the Action", data: getItOnTVShows.results },
	];

	return { banner, mediaSections };
};

export const fetchMovieData = async (
	getBannerMedia: Promise<MediaResults<Movie>> | Promise<MediaResults<TVShow>>,
) => {
	const [bannerMedia, westernMovies, comedyMovies, excitingMovies] =
		await Promise.all([
			getBannerMedia,
			getMoviesByGenre("37"),
			getMoviesByGenre("35"),
			getMoviesByGenre("28"),
		]);

	const banner = getRandomMedia(bannerMedia.results) as Movie;
	const mediaSections: MediaSection[] = [
		{ title: "Western Movies", data: westernMovies.results },
		{ title: "Comedy Movies", data: comedyMovies.results },
		{ title: "Exciting Movies", data: excitingMovies.results },
	];

	return { banner, mediaSections };
};

export const getTVShowEpisodesBySeason = async (
	tvShowId: number,
	seasonNumber: number,
): Promise<DetailsSeason> =>
	tmdbFetch(`/tv/${tvShowId}/season/${seasonNumber}`);

export const getSearchMulti = async (
	query: string,
	page: number,
): Promise<MediaResults<MediaSearch>> => {
	return tmdbFetch("/search/multi", {}, { query, page: `${page}` });
};
