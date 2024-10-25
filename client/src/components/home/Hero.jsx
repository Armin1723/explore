import React, { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Hero = () => {

  const [curr, setCurr] = useState(0);

  useEffect(()=>{
    const autoSlide = setInterval(() => {
      setCurr((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(autoSlide);
  },[])

  return (
    <div className="w-screen -mt-16 h-[80vh] min-h-[40vh] max-sm:h-[40vh] overflow-hidden relative">
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <img
            key={index}
            src={`/assets/hero-image-${index + 1}.webp`}
            alt='hero'
            fill
            className={`aspect-video object-fill !rounded-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 ${index === curr && 'opacity-100'}`}
          />
        );
      })}

      <div className="absolute w-full mt-8 top-1/2 px-8 -translate-y-1/2 flex justify-between items-center">
        <div className="prev p-2 hover:shadow-[0_0_15px_gray] shadow-gray-300/50 rounded-full border border-gray-500/50 transition-all duration-100 cursor-pointer" onClick={()=> setCurr(prev => prev === 0 ? 3 : prev - 1)}><GoChevronLeft /></div>
        <div className="prev p-2 hover:shadow-[0_0_15px_gray] shadow-gray-300/50 rounded-full border border-gray-500/50 transition-all duration-100 cursor-pointer" onClick={()=> setCurr(prev => (prev + 1)% 4)}><GoChevronRight /></div>
      </div>
    </div>
  );
};
export default Hero;
