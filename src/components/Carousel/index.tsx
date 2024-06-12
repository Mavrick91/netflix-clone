"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./carousel.css";

import Slider, { Settings } from "react-slick";

import useManageQueryParams from "@/hooks/useManageQueryParams";
import { Movie, TVShow } from "@/types";
import { isMovie } from "@/utils/media";

import ImageTMDB from "../ImageTMDB";

type Props = {
	medias: (Movie | TVShow)[];
	mediaType: "movie" | "tv";
};

const NetflixCarousel = ({ medias, mediaType }: Props) => {
	const { addQueryParams } = useManageQueryParams();
	const settings: Settings = {
		infinite: true,
		speed: 500,
		slidesToScroll: 4,
		slidesToShow: 6,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 6,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	};

	return (
		<div className="netflix-carousel">
			<Slider {...settings}>
				{medias.map((media) => {
					if (!media.backdrop_path) return null;

					return (
						<button
							type="button"
							key={isMovie(media) ? media.title : media.name}
							className="slick-slide-custom rounded"
							onClick={() =>
								addQueryParams({ jbv: `${media.id}`, type: mediaType })
							}
						>
							<ImageTMDB
								className="overflow-hidden rounded transition-all duration-300 ease-in-out hover:z-50 hover:scale-110"
								image={media.backdrop_path}
								imageProps={{
									alt: isMovie(media) ? media.title : media.name,
									width: 272,
									height: 153,
								}}
							/>
						</button>
					);
				})}
			</Slider>
		</div>
	);
};

const NextArrow = () => <div className="slick-next" />;
const PrevArrow = () => <div className="slick-prev" />;

export default NetflixCarousel;
