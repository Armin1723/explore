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
      <div className="flex items-center border border-brand/60 rounded-md overflow-hidden bg-white shadow-sm w-[20vw]">
        
        {/* Text Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search query"
          className="flex-1 border-none outline-none bg-transparent pl-2 text-sm text-black placeholder:text-gray-400"
        />

        {/* Search Icon */}
        <button onClick={handleSearch} className="bg-brand/10 hover:bg-brand/20 transition-all duration-300 ease-in cursor-pointer p-2 border-l border-brand/60 h-full">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
