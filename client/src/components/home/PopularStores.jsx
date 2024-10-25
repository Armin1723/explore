import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const PopularStores = () => {
  const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 3000);
  const [embla, setEmbla] = useState(null);

  useEffect(() => {
    autoplayInterval.start();

    return autoplayInterval.stop;
  }, [embla]);

  const stores = [
    {
      name: "Store 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 7",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 8",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 9",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 10",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
  ];

  return (
    <div className="w-screen py-6 flex flex-col items-center">
      <p className="heading py-6">Popular Stores</p>
      <div className="carousel-container mask md:w-[80%] w-[90%]">
        <Carousel
          slideSize={{ base: "50%", sm: "50%", md: "20%" }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          getEmblaApi={setEmbla}
          align="start"
        >
          {stores.map((store, index) => {
            return (
              <Carousel.Slide key={index}>
                <Link
                  to={`/companies/${store?.name
                    ?.toLowerCase()
                    .split(" ")
                    .join("-")}`}
                  className="flex flex-col my-8 p-2 rounded-xl group hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src="https://picsum.photos/200/300"
                      alt="store"
                      className="w-full aspect-[4/3] object-cover rounded-lg group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                  <div className="details flex flex-col justify-around p-4">
                    <div className="flex justify-between w-full pb-2">
                      <p className="sub-heading">
                        {store.name}
                      </p>
                      <div className="icon p-2 rounded-full border border-gray-500/50 group-hover:-rotate-45 group-hover:bg-accent transition-all duration-300">
                        <MdArrowRightAlt size={18} />
                      </div>
                    </div>
                    <p className="italic">
                      {store.description.split(" ").slice(0, 10).join(" ")}
                    </p>
                  </div>
                </Link>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularStores;
