import BrowseBanner from "@/app/browse/_components/BrowseBanner";
import CarouselSection from "@/components/CarouselSection";
import { Movie, TVShow } from "@/types";

type MediaDisplayProps = {
	bannerMedia: Movie | TVShow;
	mediaSections: any[];
	mediaType: "movie" | "tv";
};

const MediaDisplay = ({
	bannerMedia,
	mediaSections,
	mediaType,
}: MediaDisplayProps) => {
	return (
		<div>
			<BrowseBanner bannerMedia={bannerMedia} mediaType={mediaType} />
			<div className="relative z-40 flex flex-col space-y-9 bg-[#141414]">
				{mediaSections.map((section) => (
					<CarouselSection
						title={section.title}
						key={section.title}
						medias={section.data}
						mediaType={mediaType}
					/>
				))}
			</div>
		</div>
	);
};

export default MediaDisplay;
