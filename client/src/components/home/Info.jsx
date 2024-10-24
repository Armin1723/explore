import { ActionIcon, rem, TextInput } from "@mantine/core";
import React from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Info = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = () => {  
    navigate(`/companies/search?query=${searchQuery}`);
  }
  
  return (
    <div className="info flex flex-col items-center bg-white px-4 gap-4 w-[90vw] py-4">
      <div className="flex text-3xl max-sm:text-xl font-semibold tracking-tight ">
        <p>Search Across &nbsp;</p>
        <span className="text-blue-800 !font-extrabold">
          <Typewriter
            options={{
              strings: ["500+ Companies", "10+ Categories", "1000+ Products"],
              autoStart: true,
              loop: true,
              changeDeleteSpeed: 1,
              pauseFor: 2000,
            }}
          />
        </span>
      </div>
      <TextInput
        radius="md"
        size="md"
        placeholder="Search query"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        className="w-full md:w-[40vw] shadow-[0_0_8px_blue] shadow-blue-600/20"
        rightSectionWidth={42}
        leftSection={
          <FaSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        rightSection={
          <ActionIcon size={32} radius="xl" variant="filled" onClick={handleSearch}>
            <FaArrowRight
              style={{ AAwidth: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
      />
    </div>
  );
};

export default Info;
