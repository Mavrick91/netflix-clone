import classNames from "classnames";

import BorderExpand from "@/components/BorderExpand";
import { Movie, TVShow } from "@/types";

import RecommendationMovie from "./RecommendationMovie";

type MoreLikeThisProps = {
	mediaRecommendation: Movie[] | TVShow[];
	isCollapsed: boolean;
	setIsCollapsed: (value: boolean) => void;
};

const MoreLikeThis: React.FC<MoreLikeThisProps> = ({
	mediaRecommendation,
	isCollapsed,
	setIsCollapsed,
}) => (
	<div className="mb-24">
		<h3 className="mb-5 mt-12 text-2xl font-bold text-white">More Like This</h3>
		<div
			className={classNames(
				"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all",
				{
					"max-h-[960px]": isCollapsed,
					"max-h-[9960px]": !isCollapsed,
				},
			)}
		>
			{mediaRecommendation.map((media) => (
				<RecommendationMovie key={media.id} media={media} />
			))}
		</div>
		<BorderExpand
			mediaType="movie"
			onClick={() => setIsCollapsed(!isCollapsed)}
			isCollapsed={isCollapsed}
		/>
	</div>
);

export default MoreLikeThis;
