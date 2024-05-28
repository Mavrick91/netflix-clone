import { getBannerMovies } from "@/actions/tmdb";
import MediaDisplay from "@/components/MediaDisplay";
import { getRandomMedia } from "@/utils/utils";

const BrowsePage = async () => {
  const data = await getBannerMovies();

  return <MediaDisplay bannerMedia={getRandomMedia(data.results)} />;
};

export default BrowsePage;
