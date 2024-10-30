import { Carousel } from "@mantine/carousel";
import React, { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const SavedListings = ({user}) => {

  const [embla, setEmbla] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
//   const [stores, setStores] = useState(user?.savedCompanies || []);


  const stores = [
    {
      name: "Store 1",
      image: "https://picsum.photos/200/300?random=1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 2",
      image: "https://picsum.photos/200/300?random=2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 3",
      image: "https://picsum.photos/200/300?random=3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 4",
      image: "https://picsum.photos/200/300?random=4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 5",
      image: "https://picsum.photos/200/300?random=5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 6",
      image: "https://picsum.photos/200/300?random=6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 7",
      image: "https://picsum.photos/200/300?random=7",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 8",
      image: "https://picsum.photos/200/300?random=8",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 9",
      image: "https://picsum.photos/200/300?random=9",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
    {
      name: "Store 10",
      image: "https://picsum.photos/200/300?random=10",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium obcaecati distinctio a possimus at cum sit quo inventore eaque nostrum?",
    },
  ];

  return (
    <div className="w-full flex flex-col items-start my-4">
      <p className="text-lg font-bold my-4 capitalize pl-8 max-sm:pl-6 border-l-4 border-l-primary">
      Saved Stores:
      </p>

      <div className="carousel-wrapper w-full py-4 border-t border-b border-black flex items-center justify-center">
        <div className="carousel-container relative w-full">
          <Carousel
            slideSize="20%"
            slideGap="md"
            align="start"
            loop
            breakpoints={[
              { maxWidth: "md", slideSize: "33.333%" },
              { maxWidth: "sm", slideSize: "50%" },
              { maxWidth: "xs", slideSize: "100%" },
            ]}
            onSlideChange={(index) => setActiveSlide(index)}
            getEmblaApi={setEmbla}
            withControls={false}
          >
            {stores.map((company, index) => (
              <Carousel.Slide key={index}>
                <Link
                  to={`/companies/${company?.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex flex-col h-full rounded-xl group bg-gray-200 hover:bg-primary hover:text-white transition-all duration-200 border border-black hover:border-accent"
                >
                  <div className="image-container w-full aspect-video overflow-hidden rounded-t-lg flex items-center justify-center">
                    <img
                      src={company?.image}
                      alt={company?.name}
                      className="w-full object-cover group-hover:scale-105 border border-black/70 transition-all duration-300"
                    />
                  </div>

                  <div className="details flex flex-col justify-around p-2">
                    <div className="flex justify-between items-center w-full pb-2 max-sm:pb-1">
                      <p className="sub-heading !max-lg:text-sm">{company?.name}</p>
                      <div className="icon p-2 flex aspect-square rounded-full border border-gray-500/50 group-hover:bg-accent transition-all duration-300">
                        <MdArrowRightAlt size={14} />
                      </div>
                    </div>
                    <p className="italic text-xs max-sm:text-[0.70rem]">
                      {company?.description.split(" ").slice(0, 10).join(" ")}
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
      </div>
    </div>
  );
};

export default SavedListings;


