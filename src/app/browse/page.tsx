import AwardWinningMovies from "./_components/AwardWinningMovies";
import BrowseBanner from "./_components/BrowseBanner";
import TrendMovies from "./_components/TrendMovies";
import UpcomingMovies from "./_components/UpcomingMovies";

const BrowsePage = () => {
  return (
    <div className="">
      <BrowseBanner />
      <div className="relative z-50 -mt-40 flex flex-col space-y-9 bg-[#141414]">
        <TrendMovies />
        <UpcomingMovies />
        <AwardWinningMovies />
      </div>
    </div>
  );
};

export default BrowsePage;
