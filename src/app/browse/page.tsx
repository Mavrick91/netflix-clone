import { getBannerMovies } from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getRandomMedia } from "@/utils/utils";

const BrowsePage = async () => {
  const data = await getBannerMovies();

  return (
    <>
      <MainHeader />
      <MediaDisplay bannerMedia={getRandomMedia(data.results)} />
    </>
  );
};

export default BrowsePage;
