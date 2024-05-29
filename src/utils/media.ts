import {
  getGenreMovies,
  getGenreTvShows,
  getMoviesByGenre,
  getTvShowsByGenre,
} from "@/actions/tmdb";
import { MovieCategory, ShowTVCategory } from "@/constans/media-ids";

import { Categories, MediaResults, Movie, TVShow } from "../../types";

type CategoryData = {
  genreList: Categories;
  data: MediaResults<Movie> | MediaResults<TVShow>;
  categoryId: typeof ShowTVCategory | typeof MovieCategory;
  genreIdSelected: string | null;
};

export const getCategoryData = async (
  genreId: string,
  categoryType: string,
): Promise<CategoryData> => {
  const isTVCategory =
    genreId === ShowTVCategory || categoryType === ShowTVCategory;
  const isMovieCategory =
    genreId === MovieCategory || categoryType === MovieCategory;

  if (isTVCategory) {
    const genreList = await getGenreTvShows();
    const data = await getTvShowsByGenre(
      genreId === ShowTVCategory ? null : genreId,
    );
    return {
      genreList,
      data,
      categoryId: ShowTVCategory,
      genreIdSelected: genreId !== ShowTVCategory ? genreId : null,
    };
  }

  if (isMovieCategory) {
    const genreList = await getGenreMovies();
    const data = await getMoviesByGenre(
      genreId === MovieCategory ? null : genreId,
    );
    return {
      genreList,
      data,
      categoryId: MovieCategory,
      genreIdSelected: genreId !== MovieCategory ? genreId : null,
    };
  }

  throw new Error("Hmmmmm");
};
