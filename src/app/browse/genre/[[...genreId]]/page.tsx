import { getMoviesByGenre, getTvShowsByGenre } from "@/actions/tmdb";
import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getCategoryData } from "@/utils/media";
import { getRandomMedia } from "@/utils/utils";

type GenrePageProps = {
  params: { genreId: string[] };
  searchParams: { cb: string };
};

type MediaSection = {
  title: string;
  data: any[];
};

const fetchMovieData = async (getBannerMedia: any) => {
  const [bannerMedia, westernMovies, comedyMovies, excitingMovies] =
    await Promise.all([
      getBannerMedia,
      getMoviesByGenre("37"),
      getMoviesByGenre("35"),
      getMoviesByGenre("28"),
    ]);

  const banner = getRandomMedia(bannerMedia.results);
  const mediaSections: MediaSection[] = [
    { title: "Western Movies", data: westernMovies.results },
    { title: "Comedy Movies", data: comedyMovies.results },
    { title: "Exciting Movies", data: excitingMovies.results },
  ];

  return { banner, mediaSections };
};

const fetchTVData = async (getBannerMedia: any) => {
  const [
    bannerMedia,
    westernTVShows,
    koreanTVShows,
    familiarTVShows,
    getItOnTVShows,
  ] = await Promise.all([
    getBannerMedia,
    getTvShowsByGenre("37"),
    getTvShowsByGenre(null, { with_origin_country: "KR" }),
    getTvShowsByGenre("18,35,10751", { sort_by: "popularity.desc" }),
    getTvShowsByGenre("10759"),
  ]);

  const banner = getRandomMedia(bannerMedia.results);
  const mediaSections: MediaSection[] = [
    { title: "Western TV Shows", data: westernTVShows.results },
    { title: "Korean TV Shows", data: koreanTVShows.results },
    { title: "Familiar TV Favorites", data: familiarTVShows.results },
    { title: "Get In On the Action", data: getItOnTVShows.results },
  ];

  return { banner, mediaSections };
};

const GenrePage = async ({ params, searchParams }: GenrePageProps) => {
  const {
    data: getBannerMedia,
    genreList,
    categoryId,
    genreIdSelected,
    isMovieCategory,
    isTVCategory,
  } = await getCategoryData(params.genreId[0], searchParams.cb);

  const { banner, mediaSections } = isMovieCategory
    ? await fetchMovieData(getBannerMedia)
    : isTVCategory
      ? await fetchTVData(getBannerMedia)
      : { banner: null, mediaSections: [] };

  return (
    <>
      <MainHeader
        categoryId={categoryId}
        categories={genreList.genres}
        genreIdSelected={genreIdSelected}
      />
      <MediaDisplay mediaSections={mediaSections} bannerMedia={banner} />
    </>
  );
};

export default GenrePage;
