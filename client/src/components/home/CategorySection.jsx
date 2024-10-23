import { Card, rem, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import React from "react";
import { FaBook, FaHome, FaLaptop, FaTshirt, FaUtensils } from "react-icons/fa";
import { MdOutlineSportsEsports, MdToys } from "react-icons/md";
import { PiHairDryerBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categoryData = [
    {
      icon: FaUtensils,
      title: "Food",
    },
    {
      icon: FaLaptop,
      title: "Electronics",
    },
    {
      icon: FaTshirt,
      title: "Fashion",
    },
    {
      icon: FaBook,
      title: "Books",
    },
    {
      icon: FaHome,
      title: "Home",
    },
    {
      icon: PiHairDryerBold,
      title: "Beauty",
    },
    {
      icon: MdToys,
      title: "Toys",
    },
    {
      icon: MdOutlineSportsEsports,
      title: "Sports",
    },
  ];


  const theme = useMantineTheme();

  return (
    <div className="category-container">
      <p className="pl-12 my-6 text-2xl border-l-4 border-teal-400">
        Categories
      </p>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-1 place-items-center">
        {categoryData.map((category, index) => {
          return (
            <Link
              to={`/companies/categories?category=${category?.title?.toLowerCase()}`}
              key={index}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-white/30 hover:scale-105 w-24 max-lg:scale-75 hover:border-blue-800/60 hover:bg-gray-100 dark:hover:bg-zinc-800/30 transition-all duration-500 mx-0"
            >
              <ThemeIcon size={34} variant="default" radius="md">
                <category.icon
                  style={{ width: rem(22), height: rem(22) }}
                  color={theme.colors.blue[6]}
                />
              </ThemeIcon>
              <p className="text-sm">{category?.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
