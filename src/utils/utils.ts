import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Movie, TVShow } from "@/types";
import { InfoParsed, InfoParsedMovie } from "@/types/InfoParsed";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getRandomMedia = (media: any[]) => {
	return media[Math.floor(Math.random() * media.length)];
};

export const formatRuntime = (runtime: number) => {
	const hours = Math.floor(runtime / 60);
	const minutes = runtime % 60;
	if (hours === 0) {
		return `${minutes}m`;
	} else {
		return `${hours}h ${minutes}m`;
	}
};

export const randomBetween = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isInfoParsedMovie = (
	infoParsed: InfoParsed,
): infoParsed is InfoParsedMovie => {
	return (infoParsed as InfoParsedMovie).type === "movie";
};

export const isMovie = (media: Movie | TVShow): media is Movie => {
	return (media as Movie).title !== undefined;
};
