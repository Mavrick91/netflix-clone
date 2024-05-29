"use server";

import tmdbFetch from "@/utils/tmdbFetch";

import { Categories, MediaResults, Movie, TVShow } from "../../types";

export const getTrendingMovies = async (): Promise<MediaResults<Movie>> => {
  return tmdbFetch("/trending/movie/week");
};

export const getUpcomingMovies = async (): Promise<MediaResults<Movie>> => {
  const today = new Date().toISOString();
  const nextMonth = new Date(
    new Date().setMonth(new Date().getMonth() + 1),
  ).toISOString();

  return tmdbFetch(
    "/discover/movie",
    {},
    {
      region: "US",
      sort_by: "release_date.desc",
      "release_date.gte": today,
      "release_date.lte": nextMonth,
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

export const getTvShowsByGenre = async (
  genreId: string | null,
): Promise<MediaResults<TVShow>> => {
  return tmdbFetch(
    "/discover/tv",
    {},
    { with_genres: `${genreId ? genreId : "10759"}` },
  );
};
