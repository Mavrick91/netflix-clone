import BorderExpand from "@/components/BorderExpand";
import useDynamicHeight from "@/hooks/useDynamicHeight";
import { Movie, TVShow } from "@/types";

import RecommendationMovie from "./RecommendationMovie";

type MoreLikeThisProps = {
	mediaRecommendation: Movie[] | TVShow[];
	isCollapsed: boolean;
	setIsCollapsed: (value: boolean) => void;
};

const GAP = 16;

const MoreLikeThis: React.FC<MoreLikeThisProps> = ({
	mediaRecommendation,
	isCollapsed,
	setIsCollapsed,
}) => {
	const { itemRef, collapsedHeight, totalHeight } = useDynamicHeight(
		mediaRecommendation,
		3,
		GAP,
	);

	return (
		<div className="mb-24">
			<h3 className="mb-5 mt-12 text-2xl font-bold text-white">
				More Like This
			</h3>
			<div
				className="grid grid-cols-1 overflow-hidden transition-all md:grid-cols-2 lg:grid-cols-3"
				style={{
					maxHeight: isCollapsed ? `${collapsedHeight}px` : `${totalHeight}px`,
					gap: `${GAP}px`,
				}}
			>
				{mediaRecommendation.map((media, index) => (
					<RecommendationMovie
						key={media.id}
						media={media}
						itemRef={index === 0 ? itemRef : null}
					/>
				))}
			</div>
			<BorderExpand
				mediaType="movie"
				onClick={() => setIsCollapsed(!isCollapsed)}
				isCollapsed={isCollapsed}
			/>
		</div>
	);
};

export default MoreLikeThis;
