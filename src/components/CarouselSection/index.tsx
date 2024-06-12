import dynamic from "next/dynamic";

import { Movie, TVShow } from "@/types";

const Carousel = dynamic(() => import("../Carousel"), { ssr: false });
const HeaderCarousel = dynamic(() => import("../HeaderCarousel"), {
	ssr: false,
});

type Props = {
	title: string;
	medias: (Movie | TVShow)[];
	mediaType: "movie" | "tv";
};

const CarouselSection = ({ title, medias, mediaType }: Props) => {
	return (
		<section aria-label={title}>
			<HeaderCarousel title={title} />
			<Carousel medias={medias} mediaType={mediaType} />
		</section>
	);
};

export default CarouselSection;
