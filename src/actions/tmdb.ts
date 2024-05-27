"use server";

import tmdbFetch from "@/utils/tmdbFetch";

import { Movie } from "../../types";

export const getTrendingMovies = async (): Promise<Movie> => {
  return tmdbFetch("/trending/movie/week");
};

export const getUpcomingMovies = async (): Promise<Movie> => {
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

export const getAwardedMovies = async (): Promise<Movie> => {
  return tmdbFetch("/movie/top_rated");
};

export const getBannerMovies = async (): Promise<Movie> => {
  return tmdbFetch("/movie/now_playing");
};
