export interface MovieResult {
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
	popularity: float;
	release_date: string;
	video: number;
	vote_average: float;
	vote_count: number;
}

export interface Movie {
	page: number;
	results: MovieResult[];
	total_pages: number;
	total_results: number;
}
