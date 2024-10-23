import React from "react";
import { ListingTimeline } from "./ListingTimeline";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-transparent via-teal-200/10 to-transparent">
      <p className="text-2xl max-sm:text-xl pl-6 md:pl-12 border-l-4 border-teal-400 mt-4">
        Get Started
      </p>
      <div className="flex max-sm:flex-col-reverse items-center min-h-[40vh] max-sm:gap-4">
        <div className="action flex flex-col items-center justify-center h-full max-sm:w-full w-1/2">
          <h1 className="text-3xl font-bold">Ready to get started?</h1>
          <p className="text-lg">
            Create an account and start exploring the best local
            recommendations.
          </p>
          <Link to="/companies/add">
                <button className="my-6 relative inline-block p-px font-semibold leading-6 text-white bg-blue-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-blue-600 dark:bg-blue-800">
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1">
                        Let's get started
                      </span>
                      <svg
                        className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                        data-slot="icon"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </span>
                </button>
          </Link>
        </div>
        <ListingTimeline />
      </div>
    </div>
  );
};

export default CallToAction;
