export interface TMDBContextType {
	sessionId: string | null;
	requestToken: string | null;
	error: string | null;
	fetchRequestToken: () => Promise<void>;
	createSession: (token: string) => Promise<void>;
}

export interface TMDBAccount {
	avatar: {
		gravatar: {
			hash: string;
		};
		tmdb: {
			avatar_path: string | null;
		};
	};
	id: number;
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	include_adult: boolean;
	username: string;
}

export interface TMBD extends TMDBAccount {
	sessionId: string | null;
}
