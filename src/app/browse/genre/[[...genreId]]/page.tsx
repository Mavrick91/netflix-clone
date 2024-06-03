import {
	fetchMovieData,
	fetchTVData,
	getDetailsMovieBannerMedia,
	getDetailsTVShowBannerMedia,
	getMoviesRecommendations,
	getTVShowsRecommendations,
} from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getCategoryData } from "@/utils/media";
import { getRandomMedia } from "@/utils/utils";

type GenrePageProps = {
	params: { genreId: string[] };
	searchParams: { cb: string };
};

const GenrePage = async ({ params, searchParams }: GenrePageProps) => {
	const {
		data: getBannerMedia,
		genreList,
		categoryId,
		genreIdSelected,
		isMovieCategory,
		isTVCategory,
	} = await getCategoryData(params.genreId[0], searchParams.cb);

	const { banner, mediaSections } = isMovieCategory
		? await fetchMovieData(getBannerMedia)
		: isTVCategory
			? await fetchTVData(getBannerMedia)
			: { banner: null, mediaSections: [] };

	const [detailsBannerMedia, mediaRecommendation] = await Promise.all([
		isMovieCategory
			? getDetailsMovieBannerMedia(banner.id)
			: getDetailsTVShowBannerMedia(banner.id),
		isMovieCategory
			? getMoviesRecommendations(banner.id)
			: getTVShowsRecommendations(banner.id),
	]);

	return (
		<>
			<MainHeader
				categoryId={categoryId}
				categories={genreList.genres}
				genreIdSelected={genreIdSelected}
			/>
			<MediaDisplay
				mediaSections={mediaSections}
				bannerMedia={detailsBannerMedia}
				mediaRecommendation={mediaRecommendation.results}
			/>
		</>
	);
};

export default GenrePage;
