"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";

import Slider, { Settings } from "react-slick";

import { Movie } from "@/types";

import ImageTMDB from "../ImageTMDB";

type Props = {
	movies: Movie[];
};

const NetflixCarousel = ({ movies }: Props) => {
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
				{movies.map((movie) => {
					if (!movie.backdrop_path) return null;

					return (
						<div key={movie.title} className="slick-slide-custom rounded">
							<ImageTMDB
								className="overflow-hidden rounded transition-all duration-300 ease-in-out hover:z-50 hover:scale-110"
								image={movie.backdrop_path}
								imageProps={{
									alt: movie.title,
									width: 272,
									height: 153,
									quality: 100,
								}}
							/>
						</div>
					);
				})}
			</Slider>
		</div>
	);
};

const NextArrow = (props: any) => <div className="slick-next" {...props} />;
const PrevArrow = (props: any) => <div className="slick-prev" {...props} />;

export default NetflixCarousel;
