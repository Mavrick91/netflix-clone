import { useMemo, useState } from "react";

import { DetailsMovie, DetailsTVShow, Movie, TVShow } from "@/types";
import { InfoParsed, InfoParsedSchema } from "@/types/InfoParsed";
import {
	mapMovieToInfoParsed,
	mapTVShowToInfoParsed,
} from "@/utils/mapBannerMedia";
import { isDetailsMovie } from "@/utils/media";
import { isInfoParsedMovie } from "@/utils/utils";

import Modal from "..";
import Content from "./Content";
import Header from "./Header";
import InfoSection from "./InfoSection";
import MoreLikeThis from "./MoreLikeThis";
import TVShowEpisodes from "./TVShowEpisodes";

type ModalInfoProps = {
	bannerMedia: DetailsMovie | DetailsTVShow;
	mediaRecommendation: Movie[] | TVShow[];
};

const ModalMoreInfo: React.FC<ModalInfoProps> = ({
	bannerMedia,
	mediaRecommendation,
}) => {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const infoParsed: InfoParsed | null = useMemo(() => {
		try {
			if (isDetailsMovie(bannerMedia)) {
				return InfoParsedSchema.parse(mapMovieToInfoParsed(bannerMedia));
			} else {
				return InfoParsedSchema.parse(mapTVShowToInfoParsed(bannerMedia));
			}
		} catch (e) {
			console.error("Error parsing info:", e);
			return null;
		}
	}, [bannerMedia]);

	if (!infoParsed) {
		return null;
	}

	return (
		<div className="w-[939px] overflow-hidden rounded-t">
			<Header bannerMedia={bannerMedia} />
			<div className="bg-[#131313] px-12">
				<Content infoParsed={infoParsed} />
				{!isInfoParsedMovie(infoParsed) && (
					<TVShowEpisodes infoParsed={infoParsed} />
				)}
				<MoreLikeThis
					mediaRecommendation={mediaRecommendation}
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
				/>
				<InfoSection infoParsed={infoParsed} />
			</div>
		</div>
	);
};

export default ModalMoreInfo;
