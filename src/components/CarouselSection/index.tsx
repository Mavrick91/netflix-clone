import Carousel from "../Carousel";
import HeaderCarousel from "../HeaderCarousel";

type Props = {
	title: string;
	medias: any[];
	mediaType: "movie" | "tv";
};

const CarouselSection = ({ title, medias, mediaType }: Props) => {
	return (
		<div>
			<HeaderCarousel title={title} />
			<Carousel movies={medias} mediaType={mediaType} />
		</div>
	);
};

export default CarouselSection;
