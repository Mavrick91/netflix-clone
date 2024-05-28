import AwardWinningMovies from "@/app/browse/_components/AwardWinningMovies";
import BrowseBanner from "@/app/browse/_components/BrowseBanner";
import TrendMovies from "@/app/browse/_components/TrendMovies";
import UpcomingMovies from "@/app/browse/_components/UpcomingMovies";

import { CategoriesItem, Movie, TVShow } from "../../../types";

type MediaDisplayProps = {
  bannerMedia: Movie | TVShow;
  categories?: CategoriesItem[];
};

const MediaDisplay = ({
  bannerMedia: bannerInfo,
  categories,
}: MediaDisplayProps) => {
  return (
    <div>
      <BrowseBanner bannerInfo={bannerInfo} categories={categories} />
      <div className="relative z-50 -mt-40 flex flex-col space-y-9 bg-[#141414]">
        <TrendMovies />
        <UpcomingMovies />
        <AwardWinningMovies />
      </div>
    </div>
  );
};

export default MediaDisplay;
