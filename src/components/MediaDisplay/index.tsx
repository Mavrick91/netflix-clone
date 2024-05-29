import AwardWinningMovies from "@/app/browse/_components/AwardWinningMovies";
import BrowseBanner from "@/app/browse/_components/BrowseBanner";
import TrendMovies from "@/app/browse/_components/TrendMovies";
import UpcomingMovies from "@/app/browse/_components/UpcomingMovies";

import { Movie, TVShow } from "../../../types";

type MediaDisplayProps = {
  bannerMedia: Movie | TVShow;
};

const MediaDisplay = ({ bannerMedia }: MediaDisplayProps) => {
  return (
    <div>
      <BrowseBanner bannerInfo={bannerMedia} />
      <div className="relative z-40 flex flex-col space-y-9 bg-[#141414]">
        <TrendMovies />
        <UpcomingMovies />
        <AwardWinningMovies />
      </div>
    </div>
  );
};

export default MediaDisplay;
