import { TVShow } from "./TVShow";

export interface Movie {
	backdrop_path: string;
	id: number;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	adult: boolean;
	title: string;
	original_language: string;
	genre_ids: number[];
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MediaResults<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface CategoriesItem {
	id: number;
	name: string;
}

export interface Categories {
	genres: CategoriesItem[];
}

export interface MediaSection {
	title: string;
	data: (TVShow | Movie)[];
}
