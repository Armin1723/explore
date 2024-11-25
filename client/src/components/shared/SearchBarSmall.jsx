import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBarSmall = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInput, setShowInput] = useState(false); // State to toggle input visibility
  const inputRef = useRef(null); // Ref for the input element

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/companies/search?query=${searchQuery}`);
    }
  };

  const toggleInput = () => {
    setShowInput((prev) => {
      const shouldShowInput = !prev;
      if (shouldShowInput) {
        // Focus the input field when it becomes visible
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100); // Delay to ensure input is rendered before focus
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
        onClick={toggleInput} // Toggle input visibility
        className="!z-[999] p-1"
      >
        <FaSearch className="text-black" />
      </button>

      {/* Input Field */}
      {showInput && (
        <div className="absolute -right-2 transition-all duration-300">
          <input
            type="text"
            ref={inputRef} // Attach the ref to the input element
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
