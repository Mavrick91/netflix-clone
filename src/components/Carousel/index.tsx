"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import ImageTMDB from "../ImageTMDB";
import { MovieResult } from "../../../types";

type Props = {
	movies: MovieResult[];
};

const NetflixCarousel = ({ movies }: Props) => {
	const settings: Settings = {
		infinite: true,
		speed: 500,
		slidesToScroll: 4,
		slidesToShow: 10,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 10,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 6,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 576,
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
					if (!movie.poster_path) return null;

					return (
						<div key={movie.title} className="slick-slide-custom transition-all hover:scale-110">
							<ImageTMDB image={movie.poster_path} alt={movie.title} />
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