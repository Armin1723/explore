import { Carousel } from "@mantine/carousel";
import { Avatar } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

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
        message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
        },
        {
        name: "jane Doe",
        title: "ABC Pvt Ltd.",
        message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    },
    {
        name: "Satya Nadela",
        title: "Microsoft",
        message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    }
  ]

return (
    <div className="flex w-full flex-col items-center py-6 relative  bg-[#d3d3d3]">
        <p className="text-2xl max:sm:text-xl font-dm-serif my-4 pl-12 max-sm:pl-6 border-l-4 border-teal-400 w-[90%] relative z-10">
            Testimonials
        </p>
        <Carousel
            slideSize="100%"
            slideGap="md"
            getEmblaApi={setEmbla}
            withControls={false}
            align="center"
            loop
            className="relative z-10"
        >
            {testimonials.map((testimonial, index) => {
                    return (
                            <Carousel.Slide key={index}>
                            <div className="slide w-full flex flex-col items-center py-6 px-4 gap-2">
                                    <Avatar size={120}></Avatar>
                                    <p className="font-dm-serif font-[500] text-2xl">{testimonial.name}</p>
                                    <p className="text-lg">({testimonial.title})</p>
                                    <p className="italic">{testimonial.message}</p>
                            </div>
                            </Carousel.Slide>
                    );
            })}
        </Carousel>
    </div>
);
};

export default Testimonials;
