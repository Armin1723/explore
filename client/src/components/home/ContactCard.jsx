import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactCard = () => {
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    const autoplayInterval = setInterval(
      () => embla && embla.scrollNext(),
      5000
    );
    return () => clearInterval(autoplayInterval);
  }, [embla]);

  return (
    <div className="flex page w-full items-center justify-center ">
      <div className="container flex items-center p-20 max-lg:px-8 max-lg:py-6 max-sm:py-2 w-[80%] max-sm:w-[90%] rounded-lg bg-[#d9d9d9] border border-black/80 translate-y-28 max-sm:translate-y-0 max-sm:mt-8 z-[10]">
        <div className="text w-1/2 max-lg:w-2/3 h-full flex flex-col max-sm:items-start ">
          <div className="heading max-sm:text-sm">
            Grab the Opportunity Now! and start exploring from our diverse
            collection.
          </div>
          <Link
            className="fancy !my-4 w-60 !max-sm:w-40 max-lg:scale-75 max-sm:scale-50 max-sm:-translate-x-12"
            to="/companies/add"
          >
            <span className="top-key"></span>
            <span className="text">Join Now</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </Link>
        </div>
        <div className="graphics relative w-1/2 max-lg:min-w-1/3 h-full flex items-center justify-center">
          {/* <img
                src='assets/contact.svg'
                alt="contact"
                className="object-cover rounded-lg max-lg:scale-125"
            /> */}
          <Carousel
            slideSize="100%"
            slideGap="md"
            align="center"
            loop
            getEmblaApi={setEmbla}
            withControls={false}
          >
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <Carousel.Slide
                  key={index}
                  className="w-full aspect-[16/9] max-sm:aspect-[16/7] overflow-hidden"
                >
                  <img
                    src={`/cta/cta-${index + 1}.png`}
                    alt={`Promotion ${index}`}
                    className="w-full aspect-[16/9] max-sm:aspect-[16/7] rounded-lg object-fill"
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
          <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between">
            <button
              className={`p-2 rounded-e-lg bg-white/40 `}
              onClick={() => embla && embla.scrollPrev()}
            >
              <FaChevronCircleLeft />
            </button>
            <button
              className={`p-2 rounded-s-lg bg-white/40 `}
              onClick={() => embla && embla.scrollNext()}
            >
              <FaChevronCircleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
