import ImageTMDB from "@/components/ImageTMDB";
import { Movie, TVShow } from "@/types";
import { isMovie } from "@/utils/media";

type Props = {
	media: Movie | TVShow;
	itemRef: React.RefObject<HTMLDivElement> | null;
};

const RecommendationMovie = ({ media, itemRef }: Props) => {
	return (
		<div
			ref={itemRef}
			className="col-span-1 flex flex-col overflow-hidden rounded"
		>
			<ImageTMDB
				className="h-[153px] w-full"
				image={media.backdrop_path}
				imageProps={{
					alt: isMovie(media) ? media.title : media.name,
					fill: true,
					loading: "lazy",
				}}
			/>
			<div className="flex grow flex-col justify-between bg-[#2F2F2F] text-white">
				<div className="flex justify-between gap-4 p-4 text-[#e7e7e7]">
					<div className="flex items-center">
						<div className="line-clamp-2 font-medium">
							{isMovie(media) ? media.original_title : media.original_name}
						</div>
					</div>
					<div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-full border p-1">
						{media.vote_average.toFixed(1)}
					</div>
				</div>
				<div className="overflow-hidden px-4 pb-4 text-sm text-[#D2D2D2]">
					<div className="line-clamp-4">{media.overview}</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendationMovie;
