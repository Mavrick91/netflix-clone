import { InfoParsed } from "@/types/InfoParsed";
import { isInfoParsedMovie, randomBetween } from "@/utils/media";
import { formatRuntime } from "@/utils/utils";

import MoreInfoInfo from "../MoreInfoInfo";

const Content = ({ infoParsed }: { infoParsed: InfoParsed }) => (
	<div className="relative z-[200] lg:-mt-20">
		<div className="grid w-full grid-cols-12 gap-4">
			<div className="col-span-12 text-[#bcbcbc] md:col-span-8">
				<div className="flex flex-col gap-10">
					<div className="flex items-center gap-3">
						<div className="font-semibold text-[#46d369]">
							{randomBetween(70, 100)}% Match
						</div>
						<div>
							{isInfoParsedMovie(infoParsed)
								? infoParsed.releaseDate
								: `${infoParsed.seasonTotal} Seasons`}
						</div>
						{infoParsed.runtime && (
							<div>{formatRuntime(infoParsed.runtime)}</div>
						)}
					</div>
					<div className="text-sm">{infoParsed.overview}</div>
				</div>
			</div>
			<div className="col-span-12 space-y-3 text-sm text-white md:col-span-4">
				<MoreInfoInfo className="mb-2" title="Genres">
					{infoParsed.genres.join(", ")}
				</MoreInfoInfo>
				<MoreInfoInfo className="mb-2" title="Popularity">
					{infoParsed.popularity}
				</MoreInfoInfo>
				{isInfoParsedMovie(infoParsed) && (
					<MoreInfoInfo className="mb-2" title="IMDB page">
						<a
							target="_blank"
							className="underline-offset-2 hover:underline"
							href={`https://www.imdb.com/title/${infoParsed.imdbId}`}
						>
							Link
						</a>
					</MoreInfoInfo>
				)}
			</div>
		</div>
	</div>
);

export default Content;
