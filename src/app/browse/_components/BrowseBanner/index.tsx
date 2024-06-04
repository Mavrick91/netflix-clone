"use client";

import { useState } from "react";

import BannerContent from "@/components/BannerContent";
import Modal from "@/components/Modal";
import ModalMoreInfo from "@/components/Modal/ModalMoreInfo";
import { DetailsMovie, DetailsTVShow, Movie, TVShow } from "@/types";

type BrowseBannerProps = {
	bannerMedia: DetailsMovie | DetailsTVShow;
	mediaRecommendation: Movie[] | TVShow[];
};

const BrowseBanner = ({
	bannerMedia,
	mediaRecommendation,
}: BrowseBannerProps) => {
	const [showMoreInfo, setShowMoreInfo] = useState(false);

	return (
		<div className="relative inset-x-0 top-0 z-50 bg-black">
			<div className="relative flex h-[56vw] flex-col">
				<BannerContent
					bannerMedia={bannerMedia as unknown as Movie | TVShow}
					onMoreInfoClick={() => setShowMoreInfo(true)}
				/>
			</div>

			<Modal isOpen={showMoreInfo} onClose={() => setShowMoreInfo(false)}>
				<ModalMoreInfo
					bannerMedia={bannerMedia}
					mediaRecommendation={mediaRecommendation}
				/>
			</Modal>
		</div>
	);
};

export default BrowseBanner;
