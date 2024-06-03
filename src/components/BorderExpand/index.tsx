import classNames from "classnames";
import { useMemo } from "react";

import ChevronIcon from "@/assets/images/svg/ChevronIcon";

type BorderExpandProps = {
	onClick: () => void;
	isCollapsed: boolean;
	mediaType: "movie" | "tv";
};
const BorderExpand = ({
	onClick,
	isCollapsed,
	mediaType,
}: BorderExpandProps) => {
	const style = useMemo(() => {
		if (mediaType === "movie") {
			if (isCollapsed)
				return {
					marginTop: "-6em",
					background:
						"linear-gradient(0deg,#181818 0,hsla(0,0%,9%,.7) 20%,hsla(0,0%,9%,.4) 30%,transparent 50%)",
				};
			else return {};
		}
		return {
			marginTop: "-6em",
		};
	}, [isCollapsed, mediaType]);

	return (
		<div className="relative h-24 border-b-2 border-[#404040]" style={style}>
			<button
				onClick={onClick}
				className="absolute left-1/2 top-full flex max-h-11 min-h-8 min-w-8 max-w-11 -translate-x-1/2 -translate-y-5 items-center justify-center rounded-full border-2 border-primary-white-hover bg-[#2a2a2a99] p-1.5 text-white transition-all hover:border-white"
			>
				<ChevronIcon
					className={classNames({
						"transform rotate-180": !isCollapsed,
						"transform rotate-0": isCollapsed,
					})}
				/>
			</button>
		</div>
	);
};

export default BorderExpand;
