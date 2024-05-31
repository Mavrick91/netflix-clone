import AwardWinningMovies from "@/app/browse/_components/AwardWinningMovies";
import BrowseBanner from "@/app/browse/_components/BrowseBanner";
import TrendMovies from "@/app/browse/_components/TrendMovies";
import UpcomingMovies from "@/app/browse/_components/UpcomingMovies";

import { Movie, TVShow } from "../../../types";
import CarouselSection from "../CarouselSection";

type MediaDisplayProps = {
  bannerMedia: Movie | TVShow;
  mediaSections: any[];
};

const MediaDisplay = ({ bannerMedia, mediaSections }: MediaDisplayProps) => {
  console.log("🔍 mediaSections: ", mediaSections);
  return (
    <div>
      <BrowseBanner bannerInfo={bannerMedia} />
      <div className="relative z-40 flex flex-col space-y-9 bg-[#141414]">
        {mediaSections.map((section) => (
          <CarouselSection
            title={section.title}
            key={section.title}
            medias={section.data}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaDisplay;
