import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBarSmall = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInput, setShowInput] = useState(false); 
  const inputRef = useRef(null); 

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      navigate(`/companies/search?query=${searchQuery}`);
    }
  };

  const toggleInput = () => {
    setShowInput((prev) => {
      const shouldShowInput = !prev;
      if (shouldShowInput) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100); 
      }
      return shouldShowInput;
    });
  };

  return (
    <div
      className={`relative items-center max-sm:flex hidden ${
        pathname.includes("search") && "!hidden"
      }`}
      onKeyDown={handleSearch}
    >
      {/* Search Icon */}
      <button
        type="button"
        onClick={toggleInput} 
        className="!z-[999] p-1"
      >
        <FaSearch className="text-black" />
      </button>

      {/* Input Field */}
      {showInput && (
        <div className="absolute -right-2 transition-all duration-300">
          <input
            type="text"
            ref={inputRef} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`border-none outline-1 w-fit max-w-[30vw] rounded-md p-1 pl-2 text-sm bg-transparent text-black placeholder:text-gray-400 transition`}
            placeholder="Search..."
          />
        </div>
      )}
    </div>
  );
};

export default SearchBarSmall;
