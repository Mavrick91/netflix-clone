import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomMedia = (media: any[]) => {
  return media[Math.floor(Math.random() * media.length)];
};
