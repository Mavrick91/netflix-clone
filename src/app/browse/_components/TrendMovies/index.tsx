import { getTrendingMovies } from "@/actions/tmdb";
import Carousel from "@/components/Carousel";
import HeaderCarousel from "@/components/HeaderCarousel";

const TrendMovies = async () => {
  const data = await getTrendingMovies();

  return (
    <div>
      <HeaderCarousel title="Trending movies of the week" />
      <Carousel movies={data?.results} />
    </div>
  );
};

export default TrendMovies;
