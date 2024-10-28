// import { Carousel } from "@mantine/carousel";
// import { useInterval } from "@mantine/hooks";
// import React, { useEffect, useState } from "react";

// import classes from "./Testimonials.module.css";
// import {
//   FaChevronCircleLeft,
//   FaChevronCircleRight,
//   FaUser,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import MarqueeItem from "./MarqueeItem";
// import { upperMarquee } from "../../utils";

// const Testimonials = () => {
//   const [embla, setEmbla] = useState(null);
//   const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 6000);
//   const [activeSlide, setActiveSlide] = useState(0);

//   useEffect(() => {
//     autoplayInterval.start();

//     return autoplayInterval.stop;
//   }, [embla]);

//   const testimonials = [
//     {
//       name: "John Doe",
//       company: "Food Mart",
//       message:
//         "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta deleniti eos nisi sed fuga omnis assumenda iste repellendus odio reiciendis provident incidunt dolores alias, iusto ipsum doloremque consectetur quo. Exercitationem possimus porro a voluptas perferendis quibusdam accusamus dolore quam labore.",
//     },
//     {
//       name: "jane Doe",
//       company: "ABC Pvt Ltd.",
//       message:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
//     },
//     {
//       name: "Satya Nadela",
//       company: "Microsoft",
//       message:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
//     },
//   ];

//   return (
//     <div className="flex flex-col page w-full items-center justify-center bg-gradient-to-b from-secondary to-white">
//       <p className="heading py-6 w-[90%]">Our Esteemed Partners</p>
//       <div className="marquee flex flex-col py-6 items-center md:text-3xl text-black max-lg:text-xs rounded-t-lg overflow-hidden whitespace-nowrap ">
//         <MarqueeItem images={upperMarquee} frm={"0%"} to={"-100%"}/>
//       </div>

//       <div className="flex flex-col items-center p-6 md:px-12 relative bg-primary overflow-x-hidden text-white mx-8 my-4 rounded-lg w-[90%]">
//         <p className="heading max-sm:mt-0 text-center max-sm:py-2 my-6">
//           Hear what our customers have to say.
//         </p>

//         <Carousel
//           slideSize={{ base: "100%", sm: "50%", md: "50%" }}
//           slideGap={{ base: "sm", sm: "sm", md: "md" }}
//           onSlideChange={(index) => setActiveSlide(index)}
//           getEmblaApi={setEmbla}
//           withIndicators
//           withControls={false}
//           align="start"
//           loop
//           className="z-10"
//           classNames={{
//             indicator: classes.carouselIndicator,
//           }}
//         >
//           {testimonials.map((testimonial, index) => {
//             return (
//               <Carousel.Slide key={index}>
//                 <div
//                   className={`slide group relative flex flex-col items-center justify-center w-full aspect-[16/7] !max-lg:aspect-[1/1.2] max-lg:max-h-[30vh] min-h-[25vh] bg-secondary text-black rounded-lg py-8 max-lg:py-4 max-lg:my-4 max-sm:my-2 overflow-hidden mb-8 max-lg:mb-4`}
//                 >
//                   <FaUser className="text-6xl max-sm:text-4xl min-h-[5vh] aspect-square" />
//                   <div className="details flex flex-col justify-around items-center h-full">
//                     <div className="flex flex-col items-center">
//                       <p className="font-['poppins'] font-[500] text-2xl">
//                         {testimonial.name}
//                       </p>
//                       <Link
//                         to={`/companies/${testimonial.company
//                           .toLowerCase()
//                           .split(" ")
//                           .join("-")}`}
//                         className="text-lg max-sm:text-md text-blue-800 hover:text-blue-950"
//                       >
//                         ({testimonial.company})
//                       </Link>
//                     </div>
//                     <p className="italic w-4/5 max-lg:w-[90%] text-center my-2">
//                       {testimonial.message.split(" ").splice(0, 30).join(" ")}...
//                     </p>
//                   </div>
//                 </div>
//               </Carousel.Slide>
//             );
//           })}
//         </Carousel>
//         <div className="controls absolute w-full top-1/2 left-0 max-lg:hidden flex justify-between">
//           <button
//             className={`p-2 rounded-e-lg bg-white/40 ${
//               activeSlide == 0 && "invisible"
//             }`}
//             onClick={() => embla && embla.scrollPrev()}
//           >
//             <FaChevronCircleLeft color="black" />
//           </button>
//           <button
//             className={`p-2 rounded-s-lg bg-white/40 ${
//               activeSlide == testimonials.length - 1 && "invisible"
//             }`}
//             onClick={() => embla && embla.scrollNext()}
//             disabled={activeSlide >= testimonials.length - 1}
//           >
//             <FaChevronCircleRight color="black" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import { Carousel } from "@mantine/carousel";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./Testimonials.module.css"; 
import MarqueeItem from "./MarqueeItem";
import { upperMarquee } from "../../utils";

const Testimonials = () => {
  const [embla, setEmbla] = useState(null);
  const autoplayInterval = useInterval(() => embla && embla.scrollNext(), 6000);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    autoplayInterval.start();
    return autoplayInterval.stop;
  }, [embla]);

  const testimonials = [
    {
      name: "John Doe",
      company: "Food Mart",
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta deleniti eos nisi sed fuga omnis assumenda iste repellendus odio reiciendis provident incidunt dolores alias, iusto ipsum doloremque consectetur quo. Exercitationem possimus porro a voluptas perferendis quibusdam accusamus dolore quam labore.",
    },
    {
      name: "Jane Doe",
      company: "ABC Pvt Ltd.",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    },
    {
      name: "Satya Nadela",
      company: "Microsoft",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eaque illum natus? Consectetur eveniet nesciunt, laudantium incidunt eligendi hic dolorem?",
    },
  ];

  return (
    <div className="flex flex-col page w-full items-center justify-center bg-gradient-to-b from-secondary to-white">
      <p className="heading py-6 w-[90%]">Our Esteemed Partners</p>
      <div className="marquee flex flex-col py-6 items-center md:text-3xl text-black max-lg:text-xs rounded-t-lg overflow-hidden whitespace-nowrap ">
        <MarqueeItem images={upperMarquee} from={"0%"} to={"-100%"} />
      </div>

      <div className="flex flex-col items-center p-6 md:px-12 relative bg-primary overflow-x-hidden text-white mx-8 my-4 pb-12 max-sm:pb-6 rounded-xl w-[90%]">
        <p className="heading max-sm:mt-4 text-center max-sm:py-2 my-6 max-w-3/5">
          Hear what our customers have to say.
        </p>

        <Carousel
          slideSize={{ base: "100%", md: "50%" }}
          slideGap={{ base: "md", md: "2vw" }}
          onSlideChange={(index) => setActiveSlide(index)}
          getEmblaApi={setEmbla}
          withIndicators
          withControls={false}
          align="start"
          loop
          className="px-20"
          classNames={{
            indicator: classes.carouselIndicator,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Carousel.Slide key={index}>
              <div className="bg-secondary text-black rounded-lg p-6 md:p-8 lg:p-10 flex flex-col items-center gap-4 shadow-md h-[300px]">
                <FaUser className="text-5xl md:text-6xl mb-2" />
                <div className="flex flex-col items-center text-center space-y-2">
                  <p className="text-xl font-semibold">{testimonial.name}</p>
                  <Link
                    to={`/companies/${testimonial.company
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                    className="text-blue-800 hover:text-blue-600"
                  >
                    ({testimonial.company})
                  </Link>
                  <p className="italic w-full max-w-lg">
                    {testimonial.message.split(" ").slice(0, 20).join(" ")}...
                  </p>
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>

        <div className="controls absolute w-full top-1/2 left-0 flex justify-between">
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
              activeSlide === testimonials.length - 1 && "invisible"
            }`}
            onClick={() => embla && embla.scrollNext()}
            disabled={activeSlide >= testimonials.length - 1}
          >
            <FaChevronCircleRight color="black" className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
