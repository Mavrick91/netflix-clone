import { getGenreTvShows, getTvShowsByGenre } from "@/actions/tmdb";
import MediaDisplay from "@/components/MediaDisplay";
import { getRandomMedia } from "@/utils/utils";

const GenrePage = async ({ params }: { params: { genreId: string[] } }) => {
  const genreId = params?.genreId?.[0];
  const categories = await getGenreTvShows();
  const data = await getTvShowsByGenre(genreId);

  return (
    <MediaDisplay
      categories={categories.genres}
      bannerMedia={getRandomMedia(data.results)}
    />
  );
};

export default GenrePage;
