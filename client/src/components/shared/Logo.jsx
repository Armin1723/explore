import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ variant = "colored", otherClasses = "" }) => {
  return (
    <Link to="/" className="flex items-center py-2">
      <img
        src={`/logo/${variant}.png`}
        alt="logo"
        className={`w-40 lg:w-fit px-2 ${otherClasses}`}
      />
    </Link>
  );
};

export default Logo;
