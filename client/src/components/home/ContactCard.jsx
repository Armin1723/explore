import React from "react";
import { Link } from "react-router-dom";

const ContactCard = () => {
  return (
    <div className="flex page w-full items-center justify-center bg-white">
      <div className="container flex p-20 max-sm:p-8 w-[80%] max-sm:w-[90%] rounded-lg bg-secondary -mb-[15vh] border mt-12 border-gray-500/50 max-sm:mb-0">
        <div className="text w-1/2 h-full max-sm:w-full  flex flex-col max-sm:items-start">
          <div className="heading">
            Grab the Opportunity Now! and start exploring from our diverse
            collection.
          </div>
          <Link className="fancy !my-4 w-60 " to="/auth">
            <span className="top-key"></span>
            <span className="text !text-black">Join Now</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </Link>
        </div>
        <div className="graphics w-1/2 h-full max-sm:hidden">
            <img
                src="src/assets/contact.svg"
                alt="contact"
                className="object-cover rounded-lg"
            />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
