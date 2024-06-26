import { Metadata } from "next";

import { fetchMovieData, fetchTVData } from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getCategoryData, isGenreMovie } from "@/utils/media";

type GenrePageProps = {
	params: { genreId: string[] };
	searchParams: { cb: string };
};

export async function generateMetadata({
	params,
	searchParams,
}: GenrePageProps): Promise<Metadata> {
	return {
		title: isGenreMovie(params.genreId[0], searchParams.cb)
			? "Movies - Netflix Clone"
			: "TV Shows - Netflix Clone",
	};
}

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

	if (!banner) throw new Error("This media does not exist anymore: 346");

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
