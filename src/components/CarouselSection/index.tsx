import React from "react";
import HeaderCarousel from "../HeaderCarousel";
import Carousel from "../Carousel";

type Props = {
  title: string;
  medias: any[];
};

const CarouselSection = ({ title, medias }: Props) => {
  return (
    <div>
      <HeaderCarousel title={title} />
      <Carousel movies={medias} />
    </div>
  );
};

export default CarouselSection;
