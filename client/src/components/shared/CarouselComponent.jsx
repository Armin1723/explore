import React, { useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";

function AutoSlidingCarousel({
  children,
  totalSlides,
  autoPlayInterval = 3000,
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: "xl", sm: "md" }}
      slidesToScroll={1}
      loop
      align="start"
      withControls={false}
      active={activeSlide}
      onSlideChange={setActiveSlide}
    >
      {children}
    </Carousel>
  );
}

export default AutoSlidingCarousel;
