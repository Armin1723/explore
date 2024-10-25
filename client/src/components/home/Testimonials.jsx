import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

import classes from "./Testimonials.module.css";

const Testimonials = () => {
  const [embla, setEmbla] = useState(null);
  const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 6000);

  useEffect(() => {
    autoplayInterval.start();

    return autoplayInterval.stop;
  }, [embla]);



  const testimonials = [
    {
      name: "John Doe",
      title: "CEO, Company",
      image: "https://xsgames.co/randomusers/avatar.php?g=male",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    },
    {
      name: "jane Doe",
      title: "ABC Pvt Ltd.",
      image: "https://xsgames.co/randomusers/avatar.php?g=female",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    },
    {
      name: "Satya Nadela",
      title: "Microsoft",
      image: "https://xsgames.co/randomusers/avatar.php?g=male",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    },
  ];

  return (
    <div className="flex flex-col items-center p-6 md:px-12 relative bg-primary overflow-x-hidden text-white mx-8 my-4 rounded-lg w-[90vw]">
      <p className="heading mt-4 max-sm:mt-0 text-center py-8 max-sm:py-2">
        Hear what our customers have to say.
      </p>

      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '50%' }}
        slideGap={{ base: 0, sm: 'md' }}
        getEmblaApi={setEmbla}
        withIndicators
        align= "start"
        slidesToScroll={{ base: 1, sm: 1, md: 1 }}
        loop
        className="z-10 mx-20 max-sm:mx-12"
        classNames={{
          indicator: classes.carouselIndicator,
        }}
      >
        {testimonials.map((testimonial, index) => {
          return (
            <Carousel.Slide key={index}>
              <div className={`slide group relative flex py-6 px-4 gap-6 bg-white rounded-xl text-black my-[8vh] max-sm:scale-x-[0.8] max-sm:scale-y-50 max-w-[80vw] max-sm:my-0`}>
                <div className='bg-gray-400 min-h-60 max-h-60 min-w-40 max-w-40 max-sm:min-w-1/2 overflow-hidden rounded-lg'>

                <img src={testimonial.image} alt={testimonial.name} className="group-hover:scale-110 h-60 w-40 object-cover rounded-lg transition-all duration-300" />
                </div>
                <div className="details flex flex-col justify-around h-full">
                <p className="font-dm-serif font-[500] text-2xl">
                  {testimonial.name}
                </p>
                <p className="text-lg">({testimonial.title})</p>
                <p className="italic">{testimonial.message}</p>
                </div>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Testimonials;
