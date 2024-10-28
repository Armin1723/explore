import { Carousel } from "@mantine/carousel";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const RecentlyReviewed = () => {
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
    <div className="w-full flex flex-col items-center">
      <p className="heading w-[90%] pb-6 max-lg:py-2 ">Recently Reviewed</p>

      <div className="carousel-wrapper w-full py-4 border-t border-b border-black flex items-center justify-center ">
        <div className="carousel-container mask max-sm:no-mask md:w-[80%] w-[90%]">
          <Carousel
            slideSize={{ base: "50%", sm: "50%", md: "20%" }}
            slideGap={{ base: "xl", sm: "xl", md: "xl" }}
            loop
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
                    className="flex flex-col p-2 h-full rounded-xl group bg-[#d9d9d9] hover:bg-primary hover:text-white transition-all duration-200 border border-black hover:border-accent hover:shadow-[0_0_30px_orange] shadow-accent/70"
                  >
                    <div className="image-container w-full aspect-[4/3] overflow-hidden rounded-lg p-3 max-lg:p-1 flex items-center justify-center">
                      {!store.image ? (
                        <img
                          src="https://picsum.photos/300/300/?store"
                          alt="store"
                          className="w-full aspect-[4/3] object-cover rounded-lg group-hover:scale-105 border border-black/70 transition-all duration-300"
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
    </div>
  );
};

export default RecentlyReviewed;
