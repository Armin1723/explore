import React from "react";
import { Link } from "react-router-dom";

const Suggestions = () => {
  const suggestions = [
    {
      title: "All About Fashion",
      subCategories: [
        {
          image: "mens-fashion",
          title: "Mens",
        },
        {
          image: "womens-fashion",
          title: "Womens",
        },
      ],
    },
    {
      title: "Daily Needs",
      subCategories: [
        {
          image: "grocery-daily",
          title: "Grocery",
        },
        {
          image: "home-daily",
          title: "Home",
        },
      ],
    },
    {
      title: "Electronics",
      subCategories: [
        {
          image: "mobiles",
          title: "Mobiles",
        },
        {
          image: "laptops",
          title: "Laptops",
        },
      ],
    },
    {
      title: "Books",
      subCategories: [
        {
          image: "fiction-books",
          title: "Fiction",
        },
        {
          image: "nonfiction-books",
          title: "Non-Fiction",
        },
      ],
    },
  ];
  return (
    <div className="page flex items-center justify-center w-full">
      <div className="container grid grid-cols-2 max-sm:grid-cols-1 w-3/4 max-sm:w-[90%] py-12 max-sm:py-4 gap-12 max-sm:gap-4">
        {suggestions &&
          suggestions.map((suggestion, index) => {
            return (
              <div
                className={`rounded-xl border group/parent border-black/70 hover:bg-primary hover:border-accent hover:shadow-[0_0_50px_orange] shadow-accent/50 transition-all duration-300 ${index > 1 && "max-sm:hidden"}`}
                key={index}
              >
                <p className="sub-heading p-6 pb-2 group-hover/parent:text-white">
                  {suggestion.title}
                </p>
                <div className="links-container flex items-center justify-center p-4 max-sm:p-1 max-sm:pb-2">
                  {suggestion.subCategories.map((subCategory, index) => {
                    return (
                      <Link
                        to={`/companies/categories?category=${subCategory.title.toLowerCase()}`}
                        className={`link flex flex-col items-center justify-center gap-4 group/child `}
                        key={index}
                      >
                        <div className="image-container w-2/3 aspect-[16/11] object-cover rounded-lg overflow-hidden border border-black/70 group-hover/child:border-accent">
                          <img
                            // src={`suggestions/${subCategory.image}.webp`}
                            src="https://picsum.photos/300/300/?suggestion"
                            alt="https://picsum.photos/300/300/?suggestion"
                            className="w-full h-full object-cover rounded-lg border border-black/70 group-hover/child:scale-105 group-hover/child:border-accent transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm group-hover/child:text-accent">{subCategory.title}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Suggestions;
