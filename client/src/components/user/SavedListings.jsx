import { Carousel } from "@mantine/carousel";
import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdArrowRightAlt, MdMore } from "react-icons/md";
import { Link } from "react-router-dom";
import striptags from "striptags";

const SavedListings = ({ user }) => {
  const [embla, setEmbla] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSavedStores = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${
            user?._id
          }/saved?page=${page}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        setStores((prev) => [...prev, ...data.stores]);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedStores();
  }, [ page]);

  return (
    <div className="w-full flex flex-col items-start my-4">
      <p className="text-lg font-bold my-4 capitalize pl-8 max-sm:pl-6 border-l-4 border-l-primary">
        Saved Stores:
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
            {stores.map((company, index) => (
              <Carousel.Slide key={index}>
                <Link
                  to={`/companies/${company?.name
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex flex-col h-full rounded-xl group bg-gray-200 hover:bg-primary hover:text-white transition-all duration-200 border border-black hover:border-accent"
                >
                  <div className="image-container w-full aspect-video overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                      src={company?.gallery[0]?.url.replace(
                        "/upload/",
                        "/upload/w_300,h_200,c_fill/"
                      )}
                      alt={company?.name}
                      className="w-full object-cover group-hover:scale-105 border border-black/70 transition-all duration-300"
                    />
                  </div>

                  <div className="details flex flex-col justify-around p-2">
                    <div className="flex justify-between items-center w-full pb-2 max-sm:pb-1">
                      <p className="sub-heading !max-lg:text-sm">
                        {company?.name}
                      </p>
                      <div className="icon p-2 flex aspect-square rounded-full border border-gray-500/50 group-hover:bg-accent group-hover:-rotate-45 transition-all duration-300">
                        <MdArrowRightAlt size={14} />
                      </div>
                    </div>
                    <p className="italic text-xs max-sm:text-[0.70rem]">
                      {striptags(
                        company?.description.split(" ").slice(0, 10).join(" ")
                      )}
                    </p>
                  </div>
                </Link>
              </Carousel.Slide>
            ))}

            {stores.length === 0 && (
              <Carousel.Slide>
                <p className="text-center">No Saved Stores</p>
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
                activeSlide === stores.length - 1 && "invisible"
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

export default SavedListings;
