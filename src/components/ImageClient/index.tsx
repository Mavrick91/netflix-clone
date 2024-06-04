"use client";

import Image, { ImageProps } from "next/image";

const ImageClient = (props: ImageProps) => {
	return (
		<Image
			{...props}
			alt={props.alt || "image"}
			quality={100}
			className="object-cover"
		/>
	);
};

export default ImageClient;
