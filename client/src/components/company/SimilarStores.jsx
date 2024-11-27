import { Carousel } from "@mantine/carousel";
import React, { Suspense, useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import CardSmall from "../backup/CardSmall";

const SimilarStores = ({ category = "all" }) => {
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
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/company/similar?category=${category}`
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
    <div className="w-full flex flex-col items-start my-4">
      <p className="heading !my-4 capitalize pl-8 max-sm:pl-6 border-l-4 border-l-primary">
        Similar Stores
      </p>

      <div className="carousel-wrapper w-full py-4 border-t border-b border-black flex items-center justify-center">
        <Suspense
          fallback={
            <div className="w-full aspect-video flex items-center justify-center">
              <div className="loader"></div>
            </div>
          }
        >
          <div className="carousel-container relative w-full">
            <Carousel
              slideSize={{ base: "50%", sm:'33.33%', md: "25%", lg: "20%" }}
              slideGap={{ base: "md", md: "md", lg: "xl" }}
              align="start"
              onSlideChange={(index) => setActiveSlide(index)}
              getEmblaApi={setEmbla}
              withControls={false}
            >
              {stores.map((company, index) => (
                <Carousel.Slide key={index}>
                  <CardSmall company={company} />
                </Carousel.Slide>
              ))}
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
        </Suspense>
      </div>
    </div>
  );
};

export default SimilarStores;
