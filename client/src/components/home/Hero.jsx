import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [embla, setEmbla] = useState(null);
  const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 6000);

  useEffect(() => {
    autoplayInterval.start();

    return autoplayInterval.stop;
  }, [embla]);

  return (
    <div className="w-full -mt-16">
      <Carousel
        slideSize="100%"
        slideGap="md"
        getEmblaApi={setEmbla}
        withControls={false}
        align="center"
        loop
      >
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Carousel.Slide key={index}>
              <img
                key={index}
                src={`src/assets/hero-image-${index + 1}.webp`}
                className="aspect-video w-full h-[80vh] object-fill !rounded-none"
              />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Hero;
