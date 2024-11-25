import React, { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = ({ visible = false }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleSearch = () => {
    navigate(`/companies/search?query=${searchQuery}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`relative ${
        pathname.includes("search") && "hidden"
      } max-lg:hidden `}
    >
      {/* Search Bar for Large Screens */}
      <div className="flex items-center border border-primary rounded-md overflow-hidden bg-white shadow-sm w-[25vw]  ">
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
    </div>
  );
};

export default SearchBar;
