import { Carousel } from "@mantine/carousel";
import React, { Suspense, useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import striptags from "striptags";

const SimilarStores = ({category = 'all'}) => {

  const [embla, setEmbla] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const storeData = [
    {
      name: "Store 1",
      gallery: [  {url: "https://picsum.photos/200/300?random=1"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 2",
      gallery: [  {url: "https://picsum.photos/200/300?random=2"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 3",
      gallery: [  {url: "https://picsum.photos/200/300?random=3"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 4",
      gallery: [  {url: "https://picsum.photos/200/300?random=4"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 5",
      gallery: [  {url: "https://picsum.photos/200/300?random=5"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 6",
      gallery: [  {url: "https://picsum.photos/200/300?random=6"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 7",
      gallery: [  {url: "https://picsum.photos/200/300?random=7"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 8",
      gallery: [  {url: "https://picsum.photos/200/300?random=8"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 9",
      gallery: [  {url: "https://picsum.photos/200/300?random=9"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 10",
      gallery: [  {url: "https://picsum.photos/200/300?random=10"}],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
  ];

  const [stores, setStores] = useState(storeData);


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/company/similar?category=${category}`
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
        <Suspense fallback={<div className="w-full aspect-video flex items-center justify-center"><div className="loader"></div></div>}>
        <div className="carousel-container relative w-full">
          <Carousel
            slideSize={{base: '50%', md: '18%'}}
            slideGap={{base: 'lg', md: 'xl'}} 
            align="start"
            loop
            onSlideChange={(index) => setActiveSlide(index)}
            getEmblaApi={setEmbla}
            withControls={false}
            className="py-2"
          >
            {stores.map((company, index) => (
              <Carousel.Slide key={index}>
                <Link
                  to={`/companies/${company?.name.toLowerCase().split(" ").join("-")}`}
                  onClick={()=>window.scrollY(0)}
                  className="flex flex-col h-full rounded-xl group bg-gray-200 hover:bg-primary hover:text-white transition-all duration-200 border border-black hover:border-accent"
                >
                  <div className="image-container w-full aspect-[14/9] overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                      src={company?.gallery[0]?.url.replace('/upload/', '/upload/w_300,h_200,c_fill/')}
                      alt={company?.name}
                      className="w-full object-cover group-hover:scale-105 border border-black/70 transition-all duration-300"
                    />
                  </div>

                  <div className="details flex flex-col justify-around p-2">
                    <div className="flex justify-between items-center w-full pb-2 max-sm:pb-1">
                      <p className="sub-heading !max-lg:text-sm">{company?.name}</p>
                      <div className="icon p-2 flex aspect-square rounded-full border border-gray-500/50 group-hover:bg-accent group-hover:-rotate-45 transition-all duration-300">
                        <MdArrowRightAlt size={14} />
                      </div>
                    </div>
                    <p className="italic text-xs max-sm:text-[0.70rem]">
                      {striptags(company?.description).split(" ").slice(0, 10).join(" ")}
                    </p>
                  </div>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>

          <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between max-md:hidden">
            <button
              className={`p-2 rounded-e-lg bg-white/40 ${activeSlide === 0 && "invisible"}`}
              onClick={() => embla && embla.scrollPrev()}
            >
              <FaChevronCircleLeft color="black" className="text-2xl" />
            </button>
            <button
              className={`p-2 rounded-s-lg bg-white/40 ${activeSlide === stores.length - 1 && "invisible"}`}
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


