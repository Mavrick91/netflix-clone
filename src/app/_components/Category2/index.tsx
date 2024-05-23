import ImageClient from "@/components/ImageClient";
import React from "react";

const Category2 = () => {
	return (
		<div className="netflix-container mx-auto flex items-center justify-center py-20 text-primary-white">
			<div className="h-[519px] basis-1/2">
				<div className="relative h-full">
					<ImageClient
						priority={false}
						alt="Device Pile Image"
						fill
						src="/images/device-pile.png"
						sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
					/>
					<div className="absolute left-[15%] top-[7%] -z-10 scale-90">
						<video autoPlay playsInline muted loop>
							<source src="/videos/video-devices.mp4" type="video/mp4" />
						</video>
					</div>
				</div>
			</div>
			<div className="flex basis-1/2 flex-col gap-4">
				<h2 className="text-5xl font-black">Watch everywhere</h2>
				<p className="text-2xl">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
			</div>
		</div>
	);
};

export default Category2;
