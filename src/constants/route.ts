import { MovieCategory, ShowTVCategory } from "./media-ids";

export const AUTH_PATHS = ["/", "/login", "/signup"];

export const NAV_LINKS = [
  { id: "/browse", name: "Home" },
  { id: `/browse/genre/${ShowTVCategory}`, name: "TV Shows" },
  { id: `/browse/genre/${MovieCategory}`, name: "Movies" },
  { id: "/latest", name: "New & Popular" },
  { id: "/browse/my-list", name: "My List" },
  { id: "/browse/original-audio", name: "Browse by Languages" },
];