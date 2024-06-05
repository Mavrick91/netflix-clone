import LinkComponent from "@/components/LinkComponent";
import { InfoParsed } from "@/types/InfoParsed";
import { isInfoParsedMovie } from "@/utils/utils";

import MoreInfoInfo from "../MoreInfoInfo";

const InfoSection = ({ infoParsed }: { infoParsed: InfoParsed }) => (
	<div className="mb-8 mt-24 pb-8 text-sm text-white">
		<h2 className="mb-4 text-2xl">
			About <span className="font-bold">{infoParsed.title}</span>
		</h2>
		<MoreInfoInfo className="mb-2" title="Original language">
			{infoParsed.original_language}
		</MoreInfoInfo>
		{isInfoParsedMovie(infoParsed) && (
			<MoreInfoInfo className="mb-2" title="Budget">
				{infoParsed.budget}
			</MoreInfoInfo>
		)}
		<MoreInfoInfo className="mb-2" title="Homepage">
			<LinkComponent
				target="_blank"
				className="underline-offset-2 hover:underline"
				href={infoParsed.homepage}
			>
				Homepage
			</LinkComponent>
		</MoreInfoInfo>
		<MoreInfoInfo className="mb-2" title="Production companies">
			{infoParsed.production_companies.join(", ")}
		</MoreInfoInfo>
		{isInfoParsedMovie(infoParsed) ? (
			<MoreInfoInfo className="mb-2" title="Revenue">
				{infoParsed.revenue}
			</MoreInfoInfo>
		) : (
			<MoreInfoInfo className="mb-2" title="Status">
				{infoParsed.status}
			</MoreInfoInfo>
		)}
		<MoreInfoInfo className="mb-2" title="Vote average">
			{infoParsed.voteAverage.toFixed(1)}
		</MoreInfoInfo>
		<MoreInfoInfo className="mb-2" title="Vote count">
			{infoParsed.voteCount}
		</MoreInfoInfo>
	</div>
);

export default InfoSection;
