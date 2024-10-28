import { ActionIcon, rem, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [curr, setCurr] = useState(0);

  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = () => {  
    navigate(`/companies/search?query=${searchQuery}`);
  }

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurr((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="w-screen aspect-video max-h-[70vh] overflow-hidden relative">
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <img
            key={index}
            src={`/assets/hero-image-${index + 1}.webp`}
            alt="hero"
            className={`aspect-video object-fill !rounded-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 ${
              index === curr && "opacity-100"
            }`}
          />
        );
      })}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] w-screen flex items-center justify-center max-sm:scale-75">
        <TextInput
          radius="md"
          size="md"
          placeholder="Search query"
          color="green.9"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          className=" md:w-[30vw] shadow-[0_0_18px_primary] placeholder:text-black"
          rightSectionWidth={42}
          leftSection={
            <FaSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          } 
          rightSection={
            <ActionIcon
              size={32}
              radius="md"
              variant="filled"
              color="primary.1"
              onClick={handleSearch}
            >
              <FaArrowRight
                style={{ AAwidth: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
        />
      </div>

      <div className="absolute w-full top-1/2 px-8 max-sm:px-4 -translate-y-1/2 z-[99] flex justify-between items-center">
        <div
          className="prev p-2 hover:shadow-[0_0_15px_gray] shadow-gray-300/50 rounded-full border border-gray-500/50 transition-all duration-100 cursor-pointer"
          onClick={() => setCurr((prev) => (prev === 0 ? 3 : prev - 1))}
        >
          <GoChevronLeft />
        </div>
        <div
          className="prev p-2 hover:shadow-[0_0_15px_gray] shadow-gray-300/50 rounded-full border border-gray-500/50 transition-all duration-100 cursor-pointer"
          onClick={() => setCurr((prev) => (prev + 1) % 4)}
        >
          <GoChevronRight />
        </div>
      </div>
    </div>
  );
};
export default Hero;
