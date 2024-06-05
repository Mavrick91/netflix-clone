import { fetchMovieData, fetchTVData } from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getCategoryData } from "@/utils/media";

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

	if (!banner) throw new Error("No banner media found");

	return (
		<>
			<MainHeader
				categoryId={categoryId}
				categories={genreList.genres}
				genreIdSelected={genreIdSelected}
			/>
			<MediaDisplay
				mediaSections={mediaSections}
				bannerMedia={banner}
				mediaType={isMovieCategory ? "movie" : "tv"}
			/>
		</>
	);
};

export default GenrePage;
