import { TVCategory, TVShowsIds } from "@/constans/media-ids";

export const isTVShowCategory = (genreId: string) => {
  if (TVShowsIds.includes(genreId) || genreId === TVCategory) return true;
  return false;
};
