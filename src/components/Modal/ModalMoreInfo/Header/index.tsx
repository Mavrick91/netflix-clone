import BannerContent from "@/components/BannerContent";
import { DetailsMovie, DetailsTVShow } from "@/types";

type HeaderProps = {
	bannerMedia: DetailsMovie | DetailsTVShow;
};

const Header: React.FC<HeaderProps> = ({ bannerMedia }) => (
	<div className="relative flex h-[528px] flex-col">
		<BannerContent bannerMedia={bannerMedia} showMoreInfo={false} />
	</div>
);

export default Header;
