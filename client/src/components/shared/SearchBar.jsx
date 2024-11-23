import { Button } from "@mantine/core";
import React, { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    setIsMobileSearchOpen(false);
    navigate(`/companies/search?query=${searchQuery}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      {/* Search Bar for Large Screens */}
      <div className="max-lg:hidden flex items-center border border-primary rounded-md overflow-hidden bg-white shadow-sm w-[25vw] ">
        {/* Search Icon */}
        <button className="text-primary bg-gray-200 p-2 border-r border-primary h-full">
          <FaSearch />
        </button>
        {/* Text Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search query"
          className="flex-1 border-none outline-none bg-transparent pl-2 text-sm text-black placeholder:text-gray-400"
        />
        {/* Search Arrow */}
        <button
          onClick={handleSearch}
          className="text-white bg-primary p-2 px-3 hover:bg-primary/90 transition"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Mobile Search Icon */}
      <button
        onClick={() => setIsMobileSearchOpen(true)}
        className="max-lg:block hidden p-2 h-full"
      >
        <FaSearch />
      </button>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg w-4/5 p-4 space-y-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your search..."
              className="w-full border border-gray-300 rounded-md p-2 outline-none"
            />
            <Button
            fullWidth
              onClick={handleSearch}
              color="primary.3"   
            >
              Search
            </Button>
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
