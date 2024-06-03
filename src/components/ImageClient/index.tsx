"use client";

import Image, { ImageProps } from "next/image";

const ImageClient = (props: ImageProps) => {
	return <Image {...props} alt="image" />;
};

export default ImageClient;
