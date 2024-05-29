import InfoIcon from "@/assets/images/svg/InfoIcon";
import ImageClient from "@/components/ImageClient";

import { Movie, TVShow } from "../../../../../types";

type BrowseBannerProps = {
  bannerInfo: Movie | TVShow;
};

const BrowseBanner = ({ bannerInfo }: BrowseBannerProps) => {
  return (
    <div className="relative inset-x-0 top-0 z-50 bg-black">
      <div className="flex h-[56vw] flex-col">
        <ImageClient
          src={`https://image.tmdb.org/t/p/original/${bannerInfo.backdrop_path}`}
          fill
          alt={bannerInfo.backdrop_path}
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

        <div className="flex grow items-end px-[4%]">
          <div className="relative mb-[10vw] w-4/5">
            <div className="flex flex-col justify-end text-white">
              <h1 className="text-[5vw] font-bold leading-[5vw]">
                {bannerInfo.title ||
                  bannerInfo.original_title ||
                  bannerInfo.original_name ||
                  bannerInfo.name}
              </h1>
              <p
                className="my-1 line-clamp-4 text-[1.2vw] sm:my-4 sm:line-clamp-3 md:mt-5"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,.45)",
                }}
              >
                {bannerInfo.overview}
              </p>
            </div>

            <button
              className="flex items-center gap-2 rounded bg-[#6d6d6eb3] px-3 py-1 text-[9px] font-medium text-white transition-all hover:bg-[#6d6d6e66] sm:py-2 sm:text-sm lg:mt-5 lg:py-3 lg:pl-6 lg:pr-8 lg:text-xl"
              type="button"
            >
              <InfoIcon className="size-3 sm:size-5 lg:size-6" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseBanner;
