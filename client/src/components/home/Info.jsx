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
    <div className="info flex flex-col items-center bg-white px-4 gap-4 w-[90vw] py-4 my-12 max-lg:my-6 max-sm:y-2">
      <div className="flex heading">
        <p className="heading !my-0">Search Across &nbsp;</p>
        <span className="text-primary heading !my-0">
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
        color="green.9"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        className="w-full md:w-[40vw] shadow-[0_0_18px_primary] shadow-primary/30 ring-primary"
        rightSectionWidth={42}
        leftSection={
          <FaSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        rightSection={
          <ActionIcon size={32} radius="md" variant="filled" color="primary.1" onClick={handleSearch}>
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
