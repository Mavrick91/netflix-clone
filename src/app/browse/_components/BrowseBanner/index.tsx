import BannerContent from "@/components/BannerContent";
import { Movie, TVShow } from "@/types";

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
