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

  return (
    <div
      className={classNames("relative w-full", className)}
      style={{ maxHeight: "152px", overflow: "hidden" }}
    >
      <div
        className="relative"
        style={{
          paddingBottom: "calc(650 / 974 * 100%)",
          height: "0",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageUrl}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 size-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImageTMDB;
