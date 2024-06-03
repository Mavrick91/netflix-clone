import { z } from "zod";

export const InfoParsedMovieSchema = z.object({
	type: z.literal("movie"),
	runtime: z.number(),
	releaseDate: z.string(),
	overview: z.string(),
	genres: z.array(z.string()),
	imdbId: z.string(),
	popularity: z.number(),
	title: z.string(),
	original_language: z.string(),
	budget: z.string(),
	homepage: z.string(),
	production_companies: z.array(z.string()),
	revenue: z.string(),
	voteAverage: z.number(),
	voteCount: z.number(),
});

export const InfoParsedTVShowSchema = z.object({
	type: z.literal("tvshow"),
	runtime: z.union([z.number(), z.null()]),
	showId: z.number(),
	releaseDate: z.string(),
	overview: z.string(),
	genres: z.array(z.string()),
	seasonTotal: z.number(),
	seasons: z.array(
		z.object({
			episodeCount: z.number(),
			id: z.number(),
			seasonNumber: z.number(),
		}),
	),
	popularity: z.number(),
	title: z.string(),
	original_language: z.string(),
	homepage: z.string(),
	production_companies: z.array(z.string()),
	createBy: z.array(z.string()),
	voteAverage: z.number(),
	voteCount: z.number(),
	status: z.string(),
});

export const InfoParsedSchema = z.union([
	InfoParsedMovieSchema,
	InfoParsedTVShowSchema,
]);

export type InfoParsedMovie = z.infer<typeof InfoParsedMovieSchema>;
export type InfoParsedTVShow = z.infer<typeof InfoParsedTVShowSchema>;
export type InfoParsed = z.infer<typeof InfoParsedSchema>;
