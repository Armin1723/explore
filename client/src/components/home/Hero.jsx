import React, { useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const [curr, setCurr] = useState(0);
  const [images, setImages] = useState([
    "/headers/banner-1.png",
    "/headers/banner-2.png",
    "/headers/banner-3.png",
    "/headers/banner-4.png",
  ]);

  useEffect(() => {
    // const fetchImages = async () => {
    //   try {
    //     const response = await fetch(
    //       `${import.meta.env.VITE_BACKEND_URL}/api/advertisement/banners`
    //     );
    //     const data = await response.json();
    //     if (!response.ok || data.banners.length === 0) {
    //       setImages([
    //         "/headers/banner-1.webp",
    //         "/headers/banner-2.webp",
    //         "/headers/banner-3.webp",
    //         "/headers/banner-4.webp",
    //       ]);
    //       throw new Error(data.message || "Failed to fetch images");
    //     } else {
    //       setImages(data.banners);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchImages();

    const autoSlide = setInterval(() => {
      setCurr((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="w-screen aspect-[16/7] max-lg:aspect-[16/8] max-h-[70vh] overflow-hidden relative">
      {images &&
        images.map((image, index) => {
          return (
            <Link
              to={`/companies/${image?.name?.split(" ").join("-")}`}
              key={index}
            >
              <img
                key={image.name}
                src={image.image}
                srcSet={`
              ${image.replace("/uploads/", "/uploads/w_400/")} 400w,
              ${image.replace("/uploads/", "/uploads/w_800/")} 800w,
              ${image.replace("/uploads/", "/uploads/w_1200/")} 1200w
            `}
                sizes="(max-width: 480px) 400px, (max-width: 768px) 800px, 1600px"
                alt="hero"
                className={`object-cover max-lg:object-fill !rounded-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 ${
                  index === curr && "opacity-100"
                }`}
              />
            </Link>
          );
        })}

      <div className="controls absolute w-full top-1/2 -translate-y-1/2 flex justify-between items-center text-[#000011] ">
        <button
          className={`p-2 max-sm:p-1 rounded-e-lg bg-white/40 `}
          onClick={() => setCurr((prev) => (prev - 1 >= 0 ? prev - 1 : 3))}
        >
          <FaChevronCircleLeft className="text-2xl max-lg:text-lg max-sm:text-sm" />
        </button>
        <button
          className={`p-2 max-sm:p-1 rounded-s-lg bg-white/40`}
          onClick={() => setCurr((prev) => (prev + 1) % 4)}
        >
          <FaChevronCircleRight className="text-2xl max-lg:text-lg max-sm:text-sm " />
        </button>
      </div>
    </div>
  );
};
export default Hero;
