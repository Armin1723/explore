import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import CardSmall from "../backup/CardSmall";
import { useSelector } from "react-redux";

const RecentlyReviewed = () => {
  const [embla, setEmbla] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [results, setResults] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchReviewedStores = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${
            user?._id
          }/reviewed-companies?page=1`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        setResults(data.reviews);
      };
      fetchReviewedStores();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="heading text-center w-[90%] pb-6 max-lg:py-2 ">Recently Reviewed</p>

      <div className="carousel-wrapper w-full py-4 flex items-center justify-center ">
        <div className="carousel-container w-[90%] relative ">
          <Carousel
            slideSize={{ base: "50%", sm: "33.33%", md: "25%", lg: "20%" }}
            slideGap='xl'
            onSlideChange={(index) => setActiveSlide(index+1)}  
            getEmblaApi={setEmbla}
            withControls={false}
            align="start"
          >
            {results && results.map((result, index) => {
              return (
                <Carousel.Slide key={index}>
                  <CardSmall company={result?.company} />
                </Carousel.Slide>
              );
            })}
          </Carousel>

          <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between max-sm:hidden">
            <button
              className={`p-2 rounded-e-lg bg-white/40 ${
                activeSlide === 0 && "invisible"
              }`}
              onClick={() => embla && embla.scrollPrev()}
            >
              <FaChevronCircleLeft color="black" className="text-2xl" />
            </button>
            <button
              className={`p-2 rounded-s-lg bg-white/40 ${
                activeSlide === results.length - 1 && "invisible"
              }`}
              onClick={() => embla && embla.scrollNext()}
              disabled={activeSlide >= results.length - 1}
            >
              <FaChevronCircleRight color="black" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyReviewed;
