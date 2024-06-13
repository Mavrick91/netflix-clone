"use client";

import classNames from "classnames";
import Image, { ImageProps } from "next/image";

const ImageClient = (props: ImageProps) => {
	return (
		<Image
			{...props}
			alt={props.alt || "image"}
			quality={100}
			className={classNames("h-full object-cover", props.className)}
		/>
	);
};

export default ImageClient;
