import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBarSmall = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = useLocation().pathname;

  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/companies/search?query=${searchQuery}`);
    }
  };

  return (
    <div
      className={`relative items-center max-sm:flex hidden ${
        pathname.includes("search") && "!hidden"
      }`}
      onKeyDown={handleSearch}
    >
      <FaSearch className="!z-[999] rounded-s-md" />
      <div className="absolute -right-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`border-none outline-1 w-fit max-w-[40vw] rounded-md p-1 text-sm bg-transparent text-black placeholder:text-gray-400 transition`}
        />
      </div>
    </div>
  );
};

export default SearchBarSmall;
