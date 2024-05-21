import ImageClient from "@/components/ImageClient";
import React from "react";

const Category1 = () => {
	return (
		<div className="netflix-container mx-auto flex items-center justify-center py-20">
			<div className="flex basis-1/2 flex-col gap-4">
				<h2 data-uia="nmhp-card-animation-text-title" className="text-5xl font-black">
					Enjoy on your TV
				</h2>
				<p data-uia="nmhp-card-animation-text-subtitle" className="text-2xl">
					Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
				</p>
			</div>
			<div className="h-[519px] basis-1/2">
				<div className="relative h-full">
					<ImageClient alt="" fill src="/images/tv.png" data-uia="nmhp-card-animation-asset-image" />
					<div data-uia="nmhp-card-animation-asset-motion" className="absolute left-[15%] top-[20%] -z-10">
						<video data-uia="nmhp-card-animation-asset-video" autoPlay playsInline muted loop>
							<source src="/videos/video-tv-0819.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Category1;
