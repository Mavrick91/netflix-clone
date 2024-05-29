import { getGenreTvShows, getTvShowsByGenre } from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { TVCategory } from "@/constans/media-ids";
import { getRandomMedia } from "@/utils/utils";

const getGenreId = (genreId: string) => {
  if (genreId === TVCategory) return null;

  return genreId;
};
const GenrePage = async ({ params }: { params: { genreId: string[] } }) => {
  const genreId = getGenreId(params?.genreId?.[0]);
  const categories = await getGenreTvShows();
  const data = await getTvShowsByGenre(genreId);

  return (
    <>
      <MainHeader categories={categories.genres} genreId={params.genreId[0]} />
      <MediaDisplay bannerMedia={getRandomMedia(data.results)} />
    </>
  );
};

export default GenrePage;
