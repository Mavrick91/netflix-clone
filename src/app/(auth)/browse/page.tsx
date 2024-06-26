import { Metadata } from "next";

import {
	getAwardedMovies,
	getBannerMovies,
	getTrendingMovies,
	getUpcomingMovies,
} from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { Movie } from "@/types";
import { getRandomMedia } from "@/utils/media";

export const metadata: Metadata = {
	title: "Home - Netflix clone",
};

const BrowsePage = async () => {
	const [bannerMedia, upcomingMovies, trendingMovies, awardedMovies] =
		await Promise.all([
			getBannerMovies(),
			getUpcomingMovies(),
			getTrendingMovies(),
			getAwardedMovies(),
		]);

	const selectedBannerMedia = getRandomMedia(bannerMedia.results) as Movie;

	const mediaSections = [
		{ title: "Trending movies of the week", data: trendingMovies.results },
		{ title: "Upcoming movies", data: upcomingMovies.results },
		{ title: "Award winning movies", data: awardedMovies.results },
	];

	return (
		<>
			<MainHeader />
			<MediaDisplay
				bannerMedia={selectedBannerMedia}
				mediaSections={mediaSections}
				mediaType="movie"
			/>
		</>
	);
};

export default BrowsePage;
