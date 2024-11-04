import { ActionIcon, rem, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [curr, setCurr] = useState(0);

  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/companies/search?query=${searchQuery}`);
  };

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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[97] flex items-center justify-center">
        <TextInput
          radius="md"
          size="sm"
          placeholder="Search query"
          color="green.9"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          className="w-[50vw] md:w-[30vw] shadow-[0_0_18px_primary] placeholder:text-black"
          rightSectionWidth={42}
          leftSection={
            <FaSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <ActionIcon
              size={28}
              radius="md"
              variant="filled"
              color="primary.1"
              onClick={handleSearch}
            >
              <FaArrowRight
                style={{ width: rem(22), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
        />
      </div>

      <div className="absolute w-full top-1/2 -translate-y-1/2 flex justify-between items-center">
        <button
          className={`p-2 rounded-e-lg bg-white/40 `}
          onClick={() => setCurr((prev) => (prev - 1 >= 0 ? prev - 1 : 3))}
        >
          <FaChevronCircleLeft color="black" className="text-2xl" />
        </button>
        <button
          className={`p-2 rounded-s-lg bg-white/70`}
          onClick={() => setCurr((prev) => (prev + 1) % 4)}
        >
          <FaChevronCircleRight color="black" className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
export default Hero;
