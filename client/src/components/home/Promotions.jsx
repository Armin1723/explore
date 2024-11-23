import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaRegStar,
} from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const Promotions = () => {

  const [embla, setEmbla] = useState(null);
  const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 5000);

  useEffect(() => {
    autoplayInterval.start();
    return autoplayInterval.stop;
  }, [embla]);

  return (
    <div className="w-[90%] flex items-center py-4 mt-[5vh] ">
      <div className="content flex flex-col justify-center items-center gap-4 w-1/3 max-sm:hidden">
        <p className="md:text-3xl max-lg:text-xl max-sm:text-lg text-center font-['poppins'] mx-4">
          We connect <span className="font-bold">Buyers</span> and{" "}
          <span className="font-bold">Sellers</span>.
        </p>
        <p className="text-xs text-gray-800 text-center">
          Your one stop destination in the city to fulfill all your needs
        </p>
        <div className="flex gap-4 justify-around w-2/3">
          <div className="item flex flex-col items-center gap-2 ">
            <VscWorkspaceTrusted className="text-4xl text-primary border border-primary rounded-full p-2 hover:bg-primary/80 hover:border-white hover:text-white cursor-pointer transition-all duration-300" />
            <p className="font-['inter'] text-center text-sm max-lg:hidden">
              Trusted <br/> Platform
            </p>
          </div>
          <div className="item flex flex-col items-center gap-2">
            <FaRegStar className="text-4xl text-primary border border-primary rounded-full p-2 hover:bg-primary/80 hover:border-white hover:text-white cursor-pointer transition-all duration-300" />
            <p className="font-['inter'] text-center text-sm max-lg:hidden">
              Safe &<br/> Secure
            </p>
          </div>
          <div className="item flex flex-col items-center gap-2">
            <MdOutlineMessage className="text-4xl text-primary border border-primary rounded-full p-2 hover:bg-primary/80 hover:border-white hover:text-white cursor-pointer transition-all duration-300" />
            <p className="font-['inter'] text-center text-sm max-lg:hidden">
              Quick <br/> Assistance
            </p>
          </div>
        </div>
      </div>

      <div className="carousel-container flex items-center justify-center flex-1 relative max-sm:px-2">
        <Carousel
          slideSize='100%'
          slideGap='xl'
          withControls={false}
          getEmblaApi={setEmbla}
          loop
        >
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <Carousel.Slide
                key={index}
                className="w-full aspect-[16/6] max-sm:aspect-[16/7] rounded-md overflow-hidden"
              >
                <img
                  src={`/banners/banner-${index + 1}.jpg`}
                  alt={`Promotion ${index}`}
                  className="w-full aspect-[16/6] max-sm:aspect-[16/7] object-fill"
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>

        <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between max-sm:hidden">
          <button
            className={`p-2 rounded-e-lg bg-white/40 `}
            onClick={() => embla && embla.scrollPrev()}
          >
            <FaChevronCircleLeft color="black" className="text-2xl" />
          </button>
          <button
            className={`p-2 rounded-s-lg bg-white/40 `}
            onClick={() => embla && embla.scrollNext()}
          >
            <FaChevronCircleRight color="black" className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
