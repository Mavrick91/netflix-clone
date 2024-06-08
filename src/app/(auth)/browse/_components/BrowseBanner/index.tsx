import dynamic from "next/dynamic";

import { Movie, TVShow } from "@/types";

const BannerContent = dynamic(() => import("@/components/BannerContent"), {
	ssr: false,
});

type BrowseBannerProps = {
	bannerMedia: Movie | TVShow;
	mediaType: "movie" | "tv";
};

const BrowseBanner = ({ bannerMedia, mediaType }: BrowseBannerProps) => {
	return (
		<div className="relative inset-x-0 top-0 z-50 bg-black">
			<div className="relative flex h-[56vw] flex-col">
				<BannerContent bannerMedia={bannerMedia} mediaType={mediaType} />
			</div>
		</div>
	);
};

export default BrowseBanner;
