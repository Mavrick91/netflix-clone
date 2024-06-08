import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("../Carousel"), { ssr: false });
const HeaderCarousel = dynamic(() => import("../HeaderCarousel"), {
	ssr: false,
});

type Props = {
	title: string;
	medias: any[];
	mediaType: "movie" | "tv";
};

const CarouselSection = ({ title, medias, mediaType }: Props) => {
	return (
		<section aria-label={title}>
			<HeaderCarousel title={title} />
			<Carousel movies={medias} mediaType={mediaType} />
		</section>
	);
};

export default CarouselSection;
