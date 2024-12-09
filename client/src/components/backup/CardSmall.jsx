import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import striptags from "striptags";

const CardSmall = ({ company }) => {
  return (
    <Link
      to={`/companies/${company?.name?.toLowerCase().replace(/\s+/g, "-")}`}
      className="flex flex-col h-full rounded-md group bg-gray-200/30 hover:bg-prmary transition-all duration-200 "
    >
      <div className="image-container w-full aspect-[3/2] overflow-hidden rounded-t-md flex items-center justify-center">
        <img
          src={company?.gallery[0]?.url?.replace(
            "/upload/",
            "/upload/w_300,h_220/"
          )}
          alt={company?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <div className="details flex flex-col justify-around p-2 px-3 pb-4">
        <div className="flex justify-between items-center w-full pb-2 max-sm:pb-1">
          <p className="sub-heading !max-lg:text-sm">{company?.name}</p>
          <div className="icon text-xl p-[0.2rem] flex aspect-square rounded-full text-primary !font-bold group-hover:bg-accent group-hover:text-white group-hover:-rotate-45 transition-all duration-300">
            <MdArrowRightAlt size={18} />
          </div>
        </div>
        <p className="text-xs max-sm:text-[0.60rem] tracking-wide text-neutral-800">
          {striptags(company?.description.split(" ").slice(0, 15).join(" ")+ '...')}
        </p>
      </div>
    </Link>
  );
};

export default CardSmall;
