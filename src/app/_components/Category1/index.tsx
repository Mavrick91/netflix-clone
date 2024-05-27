import React from "react";

import ImageClient from "@/components/ImageClient";

const Category1 = () => {
  return (
    <div className="netflix-container mx-auto flex items-center justify-center py-20 text-primary-white">
      <div className="flex basis-1/2 flex-col gap-4">
        <h2 className="text-5xl font-black">Enjoy on your TV</h2>
        <p className="text-2xl">
          Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
          players, and more.
        </p>
      </div>
      <div className="h-[519px] basis-1/2">
        <div className="relative h-full">
          <ImageClient
            priority
            alt=""
            fill
            src="/images/tv.png"
            sizes="(max-width: 768px) 100vw, 
					 (max-width: 1200px) 50vw, 
					 33vw"
          />
          <div className="absolute left-[15%] top-[20%] -z-10">
            <video autoPlay playsInline muted loop>
              <source src="/videos/video-tv-0819.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category1;
