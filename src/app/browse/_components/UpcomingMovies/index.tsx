import { getUpcomingMovies } from "@/actions/tmdb";
import Carousel from "@/components/Carousel";
import HeaderCarousel from "@/components/HeaderCarousel";

const UpcomingMovies = async () => {
  const data = await getUpcomingMovies();

  return (
    <div>
      <HeaderCarousel title="Upcoming movies" />
      <Carousel movies={data?.results} />
    </div>
  );
};

export default UpcomingMovies;
