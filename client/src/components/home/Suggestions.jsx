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
      <div className="container grid grid-cols-2 max-sm:grid-cols-1 w-[90%] max-sm:w-[90%] py-12 max-sm:py-4 gap-12 max-sm:gap-4 ">
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
                        to={`/companies/categories?category=${suggestion.category}&subCategory=${subCategory.title.toLowerCase()}`}
                        className={`link flex flex-col items-center justify-center gap-4 group/child `}
                        key={index}
                      >
                        <div className="image-container w-2/3 aspect-[16/11] object-cover rounded-lg overflow-hidden border border-black/70 group-hover/child:border-accent">
                          <img
                            src={`suggestions/${subCategory.image}.png`}
                            loading="lazy"
                            // src="https://picsum.photos/300/300/?suggestion"
                            alt="https://picsum.photos/300/300/?suggestion"
                            className="h-full w-[300px] object-cover origin-center rounded-lg border border-black/70 group-hover/child:scale-105 group-hover/child:border-accent transition-all duration-300"
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
