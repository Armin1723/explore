import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import striptags from "striptags";

const CardSmall = ({ company }) => {
  return (
    <Link
      to={`/companies/${company?.name?.toLowerCase().replace(/\s+/g, "-")}`}
      className="flex flex-col h-full rounded-md group bg-gray-200 hover:bg-primary hover:text-white transition-all duration-200 border border-black hover:border-accent"
    >
      <div className="image-container w-full aspect-[16/11] overflow-hidden rounded-t-md flex items-center justify-center">
        <img
          src={company?.gallery[0]?.url?.replace(
            "/upload/",
            "/upload/w_300,h_220/"
          )}
          alt={company?.name}
          className="w-full h-full object-cover group-hover:scale-110 border border-black/70 transition-all duration-300"
        />
      </div>

      <div className="details flex flex-col justify-around p-2 px-3">
        <div className="flex justify-between items-center w-full pb-2 max-sm:pb-1">
          <p className="sub-heading !max-lg:text-sm">{company?.name}</p>
          <div className="icon p-[0.4rem] flex aspect-square rounded-full border border-gray-500/50 group-hover:bg-accent group-hover:-rotate-45 transition-all duration-300">
            <MdArrowRightAlt size={12} />
          </div>
        </div>
        <p className="italic text-xs max-sm:text-[0.70rem]">
          {striptags(company?.description.split(" ").slice(0, 10).join(" "))}
        </p>
      </div>
    </Link>
  );
};

export default CardSmall;
