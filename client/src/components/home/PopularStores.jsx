import { Carousel } from "@mantine/carousel";
import React, { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PopularStores = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [embla, setEmbla] = useState(null);

  const stores = [
    {
      name: "Home",
      image: "/categories/home.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Books",
      image: "/categories/books.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Electronics",
      image: "/categories/electronics.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Fashion",
      image: "/categories/fashion.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Grocery",
      image: "/categories/grocery.webp",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center ">
      <p className="heading w-[90%] pb-6 max-lg:py-2 !my-0">Popular Stores</p>

      <div className="carousel-container md:w-[80%] w-[90%] relative">
        <Carousel
          slideSize={{ base: "50%", sm:'33.33%', md: "25%", lg: "20%" }}
          slideGap={{ base: "md", sm: "md", md: "2vw" }}
          onSlideChange={(index) => setActiveSlide(index)}
          withControls={false}
          getEmblaApi={setEmbla}
          align="start"
        >
          {stores.map((store, index) => {
            return (
              <Carousel.Slide key={index}>
                <Link
                  to={`/companies/categories?category=${store?.name}`}
                  className="flex flex-col justify-end relative group overflow-hidden w-full my-4 aspect-[3/4] rounded-xl border hover:border-accent transition-all duration-300"
                >
                  <img
                    src={store.image}
                    alt="https://picsum.photos/300/300/?store"
                    className="w-full h-full group-hover:scale-110 transition-all duration-300 object-cover absolute inset-0 z-[-1]"
                  />
                  <div className="flex flex-col w-full min-h-fit items-start p-4 max-lg:py-2 gap-2 max-lg:gap-1 justify-start bg-[#082222]/30 backdrop-blur-xl">
                    <p className="sub-heading max-lg:text-sm">{store?.name}</p>
                    <div
                      className="fancy w-40 max-lg:scale-50 max-lg:-translate-x-8 !py-2 !bg-gray-200"
                      to={`/companies/categories?category=${store?.name.toLowerCase()}`}
                    >
                      <span className="top-key"></span>
                      <span className="text !text-black">See Now</span>
                      <span className="bottom-key-1"></span>
                      <span className="bottom-key-2"></span>
                    </div>
                  </div>
                </Link>
              </Carousel.Slide>
            );
          })}
        </Carousel>
        <div className="controls absolute w-full top-1/2 left-0 -translate-y-1/2 flex justify-between">
          <button
            className={`p-2 rounded-e-lg bg-white/40 ${
              activeSlide == 0 && "invisible"
            }`}
            onClick={() => embla && embla.scrollPrev()}
          >
            <FaChevronCircleLeft />
          </button>
          <button
            className={`p-2 rounded-s-lg bg-white/40 ${
              activeSlide == stores.length - 4 && "invisible"
            }`}
            onClick={() => embla && embla.scrollNext()}
            disabled={activeSlide >= stores.length - 4}
          >
            <FaChevronCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularStores;
