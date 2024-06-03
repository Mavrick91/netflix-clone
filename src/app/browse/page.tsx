import {
	getAwardedMovies,
	getBannerMovies,
	getDetailsMovieBannerMedia,
	getMoviesRecommendations,
	getTrendingMovies,
	getUpcomingMovies,
} from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getRandomMedia } from "@/utils/utils";

const BrowsePage = async () => {
	const [bannerMedia, upcomingMovies, trendingMovies, awardedMovies] =
		await Promise.all([
			getBannerMovies(),
			getUpcomingMovies(),
			getTrendingMovies(),
			getAwardedMovies(),
		]);

	const selectedRandomMedia = getRandomMedia(bannerMedia.results);
	const [detailsBannerMedia, mediaRecommendation] = await Promise.all([
		getDetailsMovieBannerMedia(selectedRandomMedia.id),
		getMoviesRecommendations(selectedRandomMedia.id),
	]);

	const mediaSections = [
		{ title: "Trending movies of the week", data: trendingMovies.results },
		{ title: "Upcoming movies", data: upcomingMovies.results },
		{ title: "Award winning movies", data: awardedMovies.results },
	];

	return (
		<>
			<MainHeader />
			<MediaDisplay
				mediaSections={mediaSections}
				bannerMedia={detailsBannerMedia}
				mediaRecommendation={mediaRecommendation.results}
			/>
		</>
	);
};

export default BrowsePage;
