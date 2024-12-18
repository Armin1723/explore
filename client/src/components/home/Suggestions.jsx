import React from "react";
import { Link } from "react-router-dom";

const Suggestions = () => {
  const suggestions = [
    {
      title: "All About Fashion",
      category: "Fashion",
      subCategories: [
        {
          image: "fashion-mens",
          title: "Mens",
        },
        {
          image: "fashion-women",
          title: "Womens",
        },
      ],
    },
    {
      title: "Daily Needs",
      category: "Grocery",
      subCategories: [
        {
          image: "grocery-vegetables",
          title: "Vegetables",
        },
        {
          image: "grocery-fruits",
          title: "Fruits",
        },
      ],
    },
    {
      title: "Electronics",
      category: "Electronics",
      subCategories: [
        {
          image: "electronics-mobile",
          title: "Mobiles",
        },
        {
          image: "electronics-laptop",
          title: "Laptops",
        },
      ],
    },
    {
      title: "Books",
      category: "Books",
      subCategories: [
        {
          image: "books-fiction",
          title: "Fiction",
        },
        {
          image: "books-nonfiction",
          title: "Non-Fiction",
        },
      ],
    },
  ];
  return (
    <div className="page flex items-center justify-center w-full">
      <div className="container grid grid-cols-2 max-sm:grid-cols-1 w-[90%] py-12 max-sm:py-4 gap-12 max-sm:gap-4 ">
        {suggestions &&
          suggestions.map((suggestion, index) => {
            return (
              <div
                className={`rounded-xl border group/parent border-neutral-500/50 hover:bg-prmary hover:shadow-[0_0_5px_gray] !shadow-neutral-500/50  hover:border-accen transition-all duration-300 ${index > 1 && "max-sm:hidden"}`}
                key={index}
              >
                <p className="sub-heading p-6 pb-2 text-center !text-xl !font-normal">
                  {suggestion.title}
                </p>
                <div className="links-container flex items-center justify-center p-3 max-sm:p-1 max-sm:pb-2">
                  {suggestion.subCategories.map((subCategory, index) => {
                    return (
                      <Link
                        to={`/companies/categories/${suggestion.category}?subCategory=${subCategory.title.toLowerCase()}`}
                        className={`link flex flex-col items-center justify-center gap-4 group/child `}
                        key={index}
                      >
                        <div className="image-container w-4/5 aspect-[16/10] object-fit rounded-lg overflow-hidden ">
                          <img
                            src={`suggestions/${subCategory.image}.png`}
                            loading="lazy"
                            // src="https://picsum.photos/300/300/?suggestion"
                            alt="https://picsum.photos/300/300/?suggestion"
                            className="h-full w-[300px] object-fit origin-center rounded-lg group-hover/child:scale-105 transition-all duration-300"
                          />
                        </div>
                        <p className="text-sm group-hover/child:text-gray-800">{subCategory.title}</p>
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
