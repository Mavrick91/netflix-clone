import BrowseBanner from "@/app/browse/_components/BrowseBanner";
import CarouselSection from "@/components/CarouselSection";
import { DetailsMovie, DetailsTVShow, Movie, TVShow } from "@/types";

type MediaDisplayProps = {
	bannerMedia: DetailsMovie | DetailsTVShow;
	mediaSections: any[];
	mediaRecommendation: Movie[] | TVShow[];
};

const MediaDisplay = ({
	bannerMedia,
	mediaSections,
	mediaRecommendation,
}: MediaDisplayProps) => {
	return (
		<div>
			<BrowseBanner
				bannerMedia={bannerMedia}
				mediaRecommendation={mediaRecommendation}
			/>
			<div className="relative z-40 flex flex-col space-y-9 bg-[#141414]">
				{mediaSections.map((section) => (
					<CarouselSection
						title={section.title}
						key={section.title}
						medias={section.data}
					/>
				))}
			</div>
		</div>
	);
};

export default MediaDisplay;
