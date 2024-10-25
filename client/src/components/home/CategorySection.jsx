import { Card, rem, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import { FaBook, FaHome, FaLaptop, FaTshirt, FaUtensils } from "react-icons/fa";
import { MdArrowRightAlt, MdOutlineSportsEsports, MdToys } from "react-icons/md";
import { PiHairDryerBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categoryData = [
    {
      title: "Grocery",
      description: "Order your favourite food from your favourite restaurants",
      image: "grocery.jpg",
    },
    {
      title: "Electronics",
      description: "Get the latest gadgets at the best prices",
      image: "electronics.jpg",
    },
    {
      title: "Books",
      description: "Get lost in the world of books with our collection",
      image: "books.jpg",
    },
    {
      title: "Home",
      description: "Make your home beautiful with our home decor collection",
      image: "home.jpg",
    },
    {
      title: "Beauty",
      description: "Get the best beauty products for your skin",
      image: "beauty.jpg",
    },
    {
      title: "Fashion",
      description: "Stay stylish with our collection of fashionable clothes",
      image: "fashion.jpg",
    },
  ];

  const theme = useMantineTheme();

  return (
    <div className="w-[90%] flex flex-col items-center">
      <div className="w-full text-2xl max-sm:text-xl text-center text-wrap py-6">
        Explore through different Categories
      </div>
      <div className="categoryCards-container grid place-items-center gap-12 grid-cols-2 md:grid-cols-3 max-lg:w-full w-3/4">
        {categoryData.map((category, index) => {
          return (
            <Link
              to={`/companies/categories?category=${category.title.toLocaleLowerCase()}`}
              key={index}
              className="group rounded-lg flex flex-col items-start justify-between p-3 m-2 min-h-fit h-[50vh] bg-secondary hover:bg-primary transition-colors duration-300"
            >
              <div className="details flex flex-col group-hover:text-white transition-all duration-300 px-2 pt-4">
                <div className="pb-2 flex justify-between w-full">
                  <p className="font-semibold text-xl ">
                    {category?.title}
                  </p>
                  <div className="icon p-2 rounded-full border border-gray-500/50 group-hover:-rotate-45 group-hover:bg-accent transition-all duration-300">
                    <MdArrowRightAlt size={24} />
                  </div>
                </div>
                <p className="font-light">
                  {category?.description?.split(" ").length > 20
                    ? category?.description?.split(" ").slice(10).join(" ")
                    : category?.description}
                </p>
              </div>
              <img
                src={`categories/${category?.image}`}
                alt={category.title}
                className="w-full max-h-60 min-h-60 overflow-hidden mt-4 rounded-lg object-cover"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
