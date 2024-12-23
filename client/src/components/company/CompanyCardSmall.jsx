import { Badge, Button } from "@mantine/core";
import React from "react";
import {
  FaChevronCircleLeft,
  FaMapPin,
  FaPhoneAlt,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Bookmark from "./Bookmark";

const CompanyCardSmall = ({ company, self = false, promoted = false }) => {
  const encodedAddress = encodeURI(company?.address);

  return (
    <div className="min-h-fit max-sm:flex-col w-full max-sm:gap-2 flex items-start justify-start rounded-lg overflow-hidden border border-neutral-500/20 bg-white gap-4 group hover:border-neutral-500/50 transition-all duration-200 ">
      <div className=" left max-sm:w-full max-sm:aspect-video aspect-[1/1] lg:min-h-full w-48 max-w-1/3 overflow-hidden relative border-r border-gray-800 bg-gray-500">
      {promoted && (
        <Badge
          color="gray.3"
          c="black"
          className="absolute top-4 right-4 z-[10] bg-opacity-60 text-black"
        >
          Promoted
        </Badge>
      )}
        <img
          src={
            (company?.gallery &&
              company?.gallery[0]?.url?.replace(
                "/upload/",
                "/upload/w_300,h_200,c_fill/"
              )) ||
            "/utility/placeholder-card.png"
          }
          alt={company && company?.name}
          className="w-full h-full aspect-square object-cover group-hover:scale-110 transition-all duration-200 bg-gray-400"
        />
        <Link
          to={`/companies/${company && company?.slug}`}
          className="link absolute right-0 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/40 transition-all duration-300 flex items-center justify-center rounded-s-md p-2"
        >
          <FaChevronCircleLeft />
        </Link>
      </div>
      <div className="details right max-sm:w-full max-sm:pl-4 max-sm:py-2 flex flex-col items-start justify-between  h-full flex-1 py-3 gap-2">
        <div className="title flex w-full items-center justify-between pr-4">
          <Link
            to={`/companies/${company?.slug}`}
            className="capitalize my-0 font-bold text-2xl max-sm:text-xl font-['poppins']"
          >
            {company?.name}
          </Link>
          <div>
            <Bookmark companyId={company?._id} />
          </div>
        </div>
        <div className="ratings flex gap-2 items-center ">
          <p
            className="rating py-1 px-2 rounded-md text-white font-semibold text-xs border  flex items-center gap-1"
            style={{
              backgroundColor:
                company?.rating >= 4
                  ? "green"
                  : company?.rating >= 3.5
                  ? "yellowgreen"
                  : company?.rating >= 2.5
                  ? "orange"
                  : "red",
              color: "aliceblue",
            }}
          >
            {company?.rating == 0
              ? company?.rating
              : company?.rating.toFixed(1)}
            <FaStar size={12} />
          </p>
          {company?.reviews && (
            <p className="text-xs text-gray-500">
              {company?.reviews?.length}{" "}
              {company?.reviews?.length > 1 ? "Reviews" : "Review"}
            </p>
          )}
        </div>
        <Link
          className="text-sm flex my-1 max-sm:my-0"
          target="blank"
          to={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
        >
          <FaMapPin />
          {company?.address}
        </Link>

        {company?.website && (
          <Link
            to={`${
              company?.website.includes("https")
                ? company?.website
                : `https://${company.website}`
            } `}
            target="blank"
            className="website max-sm:text-sm max-sm:m-0 text-blue-800 hover:text-blue-900 transition-all duration-200 "
          >
            {company?.website}
          </Link>
        )}

        <div className="action-buttons flex gap-2 flex-wrap grow-0">
          {self ? (
            <Link to={`/companies/${company?.slug}/enquiries/`}>
              <Button color="brand.5">
                <IoChatbubbleEllipsesSharp className="mr-2" /> Enquiries
              </Button>
            </Link>
          ) : (
            <Link
              to={`/companies/${company?.name
                .split(" ")
                .join("-")}/enquiries/add`}
            >
              <Button color="brand.5">
                <IoChatbubbleEllipsesSharp className="mr-2" /> Enquiry
              </Button>
            </Link>
          )}
          <Link to={`tel:${company?.phone?.number}`} target="blank">
            <Button color="green.9" variant="outline">
              <FaPhoneAlt className="mr-2" /> {company?.phone?.number}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCardSmall;
