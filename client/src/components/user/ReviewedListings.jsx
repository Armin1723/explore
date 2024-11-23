import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdArrowRightAlt, MdMore } from "react-icons/md";
import { Link } from "react-router-dom";
import striptags from "striptags";
import CardSmall from "../backup/CardSmall";

const ReviewedListing = ({ user }) => {
  const [embla, setEmbla] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [results, setResults] = useState([]);

  useEffect(() => {
    try {
      const fetchReviewedStores = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${
            user?._id
          }/reviewed-companies?page=${page}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        setResults((prev) => [...prev, ...data.reviews]);
        setTotalPages(data.totalPages);
      };
      fetchReviewedStores();
    } catch (error) {
      console.error(error.message);
    }
  }, [page]);

  return (
    <div className="w-full flex flex-col items-start my-4">
      <p className="text-lg font-bold my-4 capitalize pl-8 max-sm:pl-6 border-l-4 border-l-primary">
        Reviewed Stores:
      </p>

      <div className="carousel-wrapper w-full py-4 border-t border-b border-black flex items-center justify-center">
        <div className="carousel-container relative w-full">
        <Carousel
            slideSize={{ base: "50%", md: "50%", lg: "20%" }}
            slideGap={{ base: "md", md: "md", lg: "xl" }}
            align="start"
            onSlideChange={(index) => setActiveSlide(index)}
            getEmblaApi={setEmbla}
            withControls={false}
          >
            {results &&
              results?.map((result, index) => (
                <Carousel.Slide key={index}>
                  <CardSmall company={result?.company} />
                </Carousel.Slide>
              ))}

            {results?.length === 0 && (
              <Carousel.Slide>
                <p className="py-2">No Reviewed Stores</p>
              </Carousel.Slide>
            )}

            {totalPages > page && (
              <Carousel.Slide>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="flex flex-col items-center justify-center h-full w-full rounded-xl group bg-gray-200 hover:bg-primary hover:text-white transition-all duration-200 border border-black hover:border-accent"
                >
                  <p className="sub-heading">Load More</p>
                  <MdMore size={24} />
                </button>
              </Carousel.Slide>
            )}
          </Carousel>

          <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between max-md:hidden">
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
                activeSlide === results?.length - 1 && "invisible"
              }`}
              onClick={() => embla && embla.scrollNext()}
            >
              <FaChevronCircleRight color="black" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewedListing;
