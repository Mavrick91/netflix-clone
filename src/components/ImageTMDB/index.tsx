import classNames from "classnames";
import Image from "next/image";
import React from "react";

interface ImageTMDBProps {
	image: string;
	alt: string;
	className?: string;
}

const ImageTMDB: React.FC<ImageTMDBProps> = ({ image, className, alt }) => {
	const imageUrl = `https://image.tmdb.org/t/p/original/${image}`;

	// The padding-bottom value ensures the aspect ratio is maintained
	const aspectRatio = (974 / 650) * 100;

	return (
		<div className={classNames("relative rounded-sm overflow-hidden", className)} style={{ paddingBottom: `${aspectRatio}%`, minWidth: "150px" }}>
			<Image fill src={imageUrl} alt={alt} loading="lazy" style={{ objectFit: "cover" }} />
		</div>
	);
};

export default ImageTMDB;
