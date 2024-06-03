import {
	getGenreMovies,
	getGenreTvShows,
	getMoviesByGenre,
	getTvShowsByGenre,
} from "@/actions/tmdb";
import { MovieCategory, ShowTVCategory } from "@/constants/media-ids";
import {
	Categories,
	DetailsMovie,
	DetailsTVShow,
	MediaResults,
	Movie,
	TVShow,
} from "@/types";

type CategoryData = {
	genreList: Categories;
	data: Promise<MediaResults<Movie>> | Promise<MediaResults<TVShow>>;
	categoryId: typeof ShowTVCategory | typeof MovieCategory;
	genreIdSelected: string | null;
	isTVCategory: boolean;
	isMovieCategory: boolean;
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
		const data = getTvShowsByGenre(genreId === ShowTVCategory ? null : genreId);
		return {
			genreList,
			data,
			categoryId: ShowTVCategory,
			genreIdSelected: genreId !== ShowTVCategory ? genreId : null,
			isTVCategory: true,
			isMovieCategory: false,
		};
	}

	if (isMovieCategory) {
		const genreList = await getGenreMovies();
		const data = getMoviesByGenre(genreId === MovieCategory ? null : genreId);
		return {
			genreList,
			data,
			categoryId: MovieCategory,
			genreIdSelected: genreId !== MovieCategory ? genreId : null,
			isTVCategory: false,
			isMovieCategory: true,
		};
	}

	throw new Error("Invalid category type.");
};

export const isDetailsMovie = (
	info: DetailsMovie | DetailsTVShow,
): info is DetailsMovie => {
	return (info as DetailsMovie).original_title !== undefined;
};

export const isTVShow = (info: Movie | TVShow): info is TVShow => {
	return (info as TVShow).name !== undefined;
};
