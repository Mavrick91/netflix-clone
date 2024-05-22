export interface TMDBContextType {
	sessionId: string | null;
	requestToken: string | null;
	error: string | null;
	fetchRequestToken: () => Promise<void>;
	createSession: (token: string) => Promise<void>;
}
