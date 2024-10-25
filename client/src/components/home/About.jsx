import React from "react";
import Marquee from "./Marquee";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-screen py-6 flex flex-col items-center bg-gradient-to-b from-secondary to-white">
      <Marquee />
      <div className="flex max-lg:flex-col items-center justify-center rounded-xl bg-primary w-[90%] md:w-[80%] my-6 text-secondary py-12">
        <div className="aboutText flex flex-col items-start max-lg:items-center w-full md:w-1/3 h-1/2 md:h-full justify-between gap-6">
          <div className="heading ">
            A little bit about us.
          </div>
          <div className="actual-text text-sm md:w-[80%] w-4/5 mb-4 max-lg:text-center">
            We at explore serve the needs of everyone whether it be from getting
            a job to finding the right company to work for. We are here to help
            you find the commodities you require in your everyday life. We leave
            no stone unturned in providing you with the best services and
            products available in the market.
          </div>
          <Link className="fancy my-4 " to="/auth">
            <span className="top-key"></span>
            <span className="text">Join Now</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </Link>
        </div>
        <div className="graphics w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full relative ">
          <img
            src="src/assets/about.svg"
            alt="about"
            className="object-cover rounded-lg scale-75"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
