import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router-dom";

const CarouselSection = () => {

  const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 3000);
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    autoplayInterval.start();

    return autoplayInterval.stop;
  }, [embla]);

  return (
    <div className="carousels grid grid-cols-1 md:grid-cols-2 gap-4 w-[90vw]">
      <Carousel
        slideSize='100%'
        slideGap='md'
        getEmblaApi={setEmbla}
        align="center"
        loop
        withControls
        className="!rounded-lg"
      >
        {Array.from({ length: 4 }).map((_, index) => {
          return (
            <Carousel.Slide key={index}>
              <img
                key={index}
                src={`/ad/ad-${index + 1}.jpeg`}
                className="aspect-video w-full h-80 max-sm:h-60 object-cover rounded-md"
              />
            </Carousel.Slide>
          );
        })}
      </Carousel>

      <div className="cards flex gap-4 max-sm:hidden max-lg:min-h-[40vh]">
        {[
          {
            title: "Fashion",
            description: "Get the latest fashion trends and styles.",
            image: "/assets/fashion",
          },
          {
            title: "Grocery",
            description: "Get your groceries delivered at your doorstep.",
            image: "/assets/grocery-man",
          },
          {
            title: "Electronics",
            description: "Get the best deals on electronics.",
            image: "/assets/electronics",
          },
        ].map((item, index) => {
          return (
            <div key={index} className="card flex flex-col hover:scale-[1.05] group transition-all duration-300 rounded-xl bg-gradient-to-br from-blue-800/50 to-blue-500/80 pt-6 px-4 pb-0 mb-0 cursor-pointer relative overflow-hidden">
              <div className="card-content group-hover:opacity-25 transition-all duration-300">
                <div className="card-title font-semibold text-lg capitalize">
                  {item.title}
                </div>
                <div className="card-description text-xs">
                  {item.description}
                </div>
              </div>
              <img
                src="/assets/grocery-man.png"
                alt="grocery"
                className={`object-cover w-fit transition-all duration-500 absolute bottom-0`}
              />
              <Link
                to={`/companies/categories?category=${item?.title?.toLowerCase()}`}
                className="absolute bottom-[20%] group left-0 p-2 rounded-r-lg bg-white/30 flex items-center gap-2"
              >
                <p className="w-0 group-hover:w-fit transition-all duration-500 overflow-hidden">
                  Explore
                </p>
                <FaGreaterThan className="font-extralight" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarouselSection;
