import { getGenreTvShows } from "@/actions/tmdb";
import MediaDisplay from "@/components/MediaDisplay";
import { getRandomMedia } from "@/utils/utils";

const GenrePage = async () => {
  const data = await getGenreTvShows();

  return <MediaDisplay bannerMedia={getRandomMedia(data.results)} />;
};

export default GenrePage;
