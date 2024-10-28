import React from "react";
import { Link } from "react-router-dom";

const ContactCard = () => {
  return (
    <div className="flex page w-full items-center justify-center ">
      <div className="container flex items-center p-20 max-lg:px-8 max-lg:py-6 max-sm:py-2 w-[80%] max-sm:w-[90%] rounded-lg bg-[#d9d9d9] border border-black/80 translate-y-28 max-sm:translate-y-0 max-sm:mt-8 z-[10]">
        <div className="text w-1/2 max-lg:w-2/3 h-full flex flex-col max-sm:items-start ">
          <div className="heading max-sm:text-sm">
            Grab the Opportunity Now! and start exploring from our diverse
            collection.
          </div>
          <Link className="fancy !my-4 w-60 !max-sm:w-40 max-lg:scale-75 max-sm:scale-50 max-sm:-translate-x-12" to="/companies/add">
            <span className="top-key"></span>
            <span className="text">Join Now</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </Link>
        </div>
        <div className="graphics w-1/2 max-lg:min-w-1/3 h-full flex items-center justify-center">
            <img
                src="assets/contact.svg"
                alt="contact"
                className="object-cover rounded-lg max-lg:scale-125"
            />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
