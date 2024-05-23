import { getBannerMovies } from "@/actions/tmdb";
import ImageClient from "@/components/ImageClient";
import React from "react";

const BrowseBanner = async () => {
	const data = await getBannerMovies();

	const randomMovie = data?.results[Math.floor(Math.random() * data?.results.length)];
	console.log("🚀 ~ randomMovie:", randomMovie);

	return (
		<div className="relative inset-x-0 top-0 bg-black">
			<div className="h-[56vw]">
				<ImageClient src={`https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`} fill alt="" />
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
						backgroundImage: "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.05) 29%,hsla(0,0%,8%,.58) 54%,#141414 73%,#141414)",
						backgroundPosition: " 0 top",
						backgroundRepeat: " repeat-x",
						backgroundSize: " 100% 100%",
					}}
				/>
				<div className="relative top-[22%] ml-[33px] w-5/12">
					<div className="flex flex-col text-white">
						<h1 className="text-[85px] font-bold">{randomMovie.title || randomMovie.original_title}</h1>
						<p
							className="text-[1.2vw]"
							style={{
								textShadow: "2px 2px 4px rgba(0,0,0,.45)",
							}}
						>
							{randomMovie.overview}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrowseBanner;
