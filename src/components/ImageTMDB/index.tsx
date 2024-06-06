import classNames from "classnames";
import { ImageProps } from "next/image";

import ImageClient from "../ImageClient";

interface ImageTMDBProps {
	image: string;
	className?: string;
	imageProps: Omit<ImageProps, "src">;
}

const ImageTMDB: React.FC<ImageTMDBProps> = ({
	image,
	className,
	imageProps,
}) => {
	const imageUrl = image
		? `https://image.tmdb.org/t/p/original/${image}`
		: "/images/media-placeholder.jpeg";

	return (
		<div className={classNames("relative", className)}>
			<ImageClient src={imageUrl} {...imageProps} />
		</div>
	);
};

export default ImageTMDB;
