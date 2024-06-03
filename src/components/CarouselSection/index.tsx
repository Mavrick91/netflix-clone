import Carousel from "../Carousel";
import HeaderCarousel from "../HeaderCarousel";

type Props = {
	title: string;
	medias: any[];
};

const CarouselSection = ({ title, medias }: Props) => {
	return (
		<div>
			<HeaderCarousel title={title} />
			<Carousel movies={medias} />
		</div>
	);
};

export default CarouselSection;
