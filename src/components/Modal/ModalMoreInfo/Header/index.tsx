import BannerContent from "@/components/BannerContent";
import { DetailsMovie, DetailsTVShow, Movie, TVShow } from "@/types";

type HeaderProps = {
	bannerMedia: DetailsMovie | DetailsTVShow;
};

const Header: React.FC<HeaderProps> = ({ bannerMedia }) => (
	<div className="relative flex h-[200px] flex-col sm:h-[310px] md:h-[410px] lg:h-[528px]">
		<BannerContent
			bannerMedia={bannerMedia as unknown as Movie | TVShow}
			showMoreInfo={false}
		/>
	</div>
);

export default Header;
