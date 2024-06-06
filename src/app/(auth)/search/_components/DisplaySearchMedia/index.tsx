import ImageTMDB from "@/components/ImageTMDB";
import useManageQueryParams from "@/hooks/useManageQueryParams";
import { MediaSearch } from "@/types";

type DisplaySearchMediaProps = {
	medias: MediaSearch[];
};

const DisplaySearchMedia = ({ medias }: DisplaySearchMediaProps) => {
	const { addQueryParams } = useManageQueryParams();

	if (!medias.length) return null;

	return medias.map((media) => {
		return (
			<button
				key={media.id}
				className="h-full"
				type="button"
				onClick={() =>
					addQueryParams({ jbv: `${media.id}`, type: media.media_type })
				}
			>
				<ImageTMDB
					className="h-full"
					image={media.poster_path || media.backdrop_path}
					imageProps={{
						alt: media.original_title,
						width: 202,
						height: 303,
					}}
				/>
			</button>
		);
	});
};

export default DisplaySearchMedia;
