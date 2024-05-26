import { getBannerMovies } from "@/actions/tmdb";
import InfoIcon from "@/assets/images/svg/InfoIcon";
import ImageClient from "@/components/ImageClient";
import React from "react";

const fetchRandomMovie = async () => {
  const data = await getBannerMovies();
  const movies = data?.results || [];

  const moviesWithBackdrop = movies.filter((movie) => movie.backdrop_path);

  if (moviesWithBackdrop.length > 0) {
    return moviesWithBackdrop[
      Math.floor(Math.random() * moviesWithBackdrop.length)
    ];
  }

  return null;
};

const BrowseBanner = async () => {
  const randomMovie = await fetchRandomMovie();
  console.log("🚀 ~ randomMovie:", randomMovie);

  if (!randomMovie) {
    return null;
  }

  return (
    <div className="relative inset-x-0 top-0 bg-black">
      <div className="h-[56vw]">
        <ImageClient
          src={`https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`}
          fill
          alt={randomMovie.title || randomMovie.original_title}
        />
        <div
          className="absolute inset-0 right-[26%] transition-all"
          style={{
            background: "linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)",
          }}
        />
        <div
          className="absolute inset-0 -bottom-1 right-[14.7vw] w-full transition-all"
          style={{
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.05) 29%,hsla(0,0%,8%,.58) 54%,#141414 73%,#141414)",
            backgroundPosition: "0 top",
            backgroundRepeat: "repeat-x",
            backgroundSize: "100% 100%",
          }}
        />
        <div className="relative ml-[33px] md:top-1/4 lg:top-[22%] lg:w-3/5">
          <div className="flex flex-col text-white">
            <h1 className="font-bold md:text-2xl md:leading-6 lg:text-[75px] lg:leading-[80px]">
              {randomMovie.title || randomMovie.original_title}
            </h1>
            <p
              className="mt-10 text-[1.2vw] md:mt-5"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,.45)",
              }}
            >
              {randomMovie.overview}
            </p>
          </div>

          <button
            className="mt-5 flex items-center gap-2 rounded bg-[#6d6d6eb3] py-3 pl-6 pr-8 text-xl font-medium text-white transition-all hover:bg-[#6d6d6e66]"
            type="button"
          >
            <InfoIcon />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseBanner;
