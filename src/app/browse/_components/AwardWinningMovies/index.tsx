import { memo } from "react";

import { getAwardedMovies } from "@/actions/tmdb";
import Carousel from "@/components/Carousel";
import HeaderCarousel from "@/components/HeaderCarousel";

const AwardWinningMovies = async () => {
  const data = await getAwardedMovies();

  return (
    <div>
      <HeaderCarousel title="Critically Acclaimed Movies" />
      <Carousel movies={data?.results} />
    </div>
  );
};

export default memo(AwardWinningMovies);
