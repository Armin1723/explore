import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ctaAnimation from "../../assets/cta-animation.json";

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
      <div className="container flex max-lg:flex-col-reverse items-center px-20 py-12 max-lg:px-8 max-lg:py-6 max-sm:py-4 w-[80%] max-sm:w-[90%] rounded-lg bg-gradient-to-br from-[#d0d0ee] to-secondary shadow-[0_0_20px_gray] !shadow-neutral-500/20 border border-neutral-500/40 translate-y-28 max-sm:translate-y-0 max-sm:mt-8 z-[10]">
        <div className="text w-1/2 max-lg:w-full h-full flex flex-col items-start max-lg:items-center">
          <div className="font-['poppins'] text-3xl font-medium max-lg:text-xl max-sm:text-sm text-left max-lg:text-center">
            Grab the Opportunity Now! and start exploring from our diverse
            collection.
          </div>
          <Link
            to="/companies/add"
            className="flex button group items-center justify-center gap-2 my-3 bg-accent/85 hover:bg-accent transition-all text-white duration-300 ease-in rounded-md hover:-translate-y-1 px-6 py-2 max-lg:px-3 max-lg:py-1 max-lg:text-sm"
          >
            <p>Get Started</p>
            <span className="overflow-hidden transition-all duration-300 ease-in">
              <FaArrowRight />
            </span>
          </Link>
        </div>
        <div className="graphics relative w-1/2 max-lg:w-2/3 h-full flex items-center justify-center">
          
          <img src='/cta/cta-5.png' alt="contact" className="object-cover rounded-lg "/>
          {/* <Carousel
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
          </Carousel> */}
          {/* <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
