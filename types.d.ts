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
  popularity: float;
  release_date: string;
  video: number;
  vote_average: float;
  vote_count: number;
}

export interface MediaResults<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: genre;
  origin_country: string[];
  original_language: string[];
  original_name: string;
  overview: string[];
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: stirng;
}

export interface CategoriesItem {
  id: number;
  name: string;
}

export interface Categories {
  genres: CategoriesItem[];
}
