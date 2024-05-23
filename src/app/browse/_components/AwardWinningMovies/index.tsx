import { getAwardedMovies } from "@/actions/tmdb";
import Carousel from "@/components/Carousel";
import HeaderCarousel from "@/components/HeaderCarousel";
import { memo } from "react";

const AwardWinningMovies = async () => {
	const data = await getAwardedMovies();

	return (
		<div>
			<HeaderCarousel title="Critically Acclaimed Movies" />
			<Carousel movies={data?.results} />
		</div>
	);
};

export default memo(AwardWinningMovies);
