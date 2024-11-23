import { Carousel } from "@mantine/carousel";
import { Avatar } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import striptags from "striptags";
import CardSmall from "../backup/CardSmall";

const TrendingStores = () => {
  const [embla, setEmbla] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const storeData = [
    {
      name: "Store 1",
      gallery: [{ url: "https://picsum.photos/200/300?random=1" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 2",
      gallery: [{ url: "https://picsum.photos/200/300?random=2" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 3",
      gallery: [{ url: "https://picsum.photos/200/300?random=3" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 4",
      gallery: [{ url: "https://picsum.photos/200/300?random=4" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 5",
      gallery: [{ url: "https://picsum.photos/200/300?random=5" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 6",
      gallery: [{ url: "https://picsum.photos/200/300?random=6" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 7",
      gallery: [{ url: "https://picsum.photos/200/300?random=7" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 8",
      gallery: [{ url: "https://picsum.photos/200/300?random=8" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 9",
      gallery: [{ url: "https://picsum.photos/200/300?random=9" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 10",
      gallery: [{ url: "https://picsum.photos/200/300?random=10" }],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
  ];

  const [stores, setStores] = useState(storeData);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/company/trending`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setStores(data.companies);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <p className="heading w-[90%] pb-6 max-lg:py-2 ">Trending Stores</p>

      <div className="carousel-wrapper w-full py-4 border-t border-b border-black flex items-center justify-center ">
        <div className="carousel-container mak max-sm:no-mask md:w-[80%] w-[90%] relative ">
          <Carousel
            slideSize={{ base: "50%", sm: "33.33%", md: "20%" }}
            slideGap='xl'
            onSlideChange={(index) => setActiveSlide(index + 1)}
            loop
            getEmblaApi={setEmbla}
            withControls={false}
            align="start"
          >
            {stores.map((store, index) => {
              return (
                <Carousel.Slide key={index}>
                  {/* <Link
                    to={`/companies/${store?.name
                      ?.toLowerCase()
                      .split(" ")
                      .join("-")}`}
                    className="flex flex-col items-center p-2 h-full rounded-md group hover:bg-primary hover:text-white transition-all duration-200 border border-neutral-500 hover:border-accent hover:shadow-[0_0_30px_orange] shadow-accent/70"
                  >
                    <div className="image-container w-full aspect-[4/3] overflow-hidden rounded-md flex items-center justify-center">
                      {store.gallery ? (
                        <img
                          src={store?.gallery[0]?.url?.replace(
                            "/upload/",
                            "/upload/w_300,h_200,c_fill/"
                          )}
                          alt="store"
                          className="w-full aspect-[4/3] object-cover rounded-md group-hover:scale-105 border border-black/70 transition-all duration-300"
                        />
                      ) : (
                        <img
                          src="utility/placeholder-card.png"
                          alt="store"
                          className="flex items-center justify-center object-contain w-16"
                        />
                      )}
                    </div>

                    <div className="details flex flex-col justify-around p-2">
                      <div className="flex justify-between items-center w-full pb-2 max-sm:pb-1">
                        <p className="sub-heading !max-lg:text-md">
                          {store.name}
                        </p>
                        <div className="icon p-2 flex aspect-square rounded-full border border-gray-500/50 group-hover:-rotate-45 group-hover:bg-accent transition-all duration-300">
                          <MdArrowRightAlt size={14} />
                        </div>
                      </div>
                      <p className="italic text-xs max-sm:text-[0.70rem]">
                        {striptags(store?.description)
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")}
                      </p>
                    </div>
                    </Link> */}
                    <CardSmall company={store} />
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
                (activeSlide === stores.length - 1 || stores.length < 5) &&
                "invisible"
              }`}
              onClick={() => embla && embla.scrollNext()}
              disabled={activeSlide >= stores.length - 1}
            >
              <FaChevronCircleRight color="black" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingStores;
