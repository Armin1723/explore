import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categoryData = [
    {
      title: "Grocery",
      description: "Order your favourite food from your favourite restaurants",
      image: "grocery.webp",
    },
    {
      title: "Electronics",
      description: "Get the latest gadgets at the best prices",
      image: "electronics.webp",
    },
    {
      title: "Books",
      description: "Get lost in the world of books with our collection",
      image: "books.webp",
    },
    {
      title: "Home",
      description: "Make your home beautiful with our home decor collection",
      image: "home.webp",
    },
    {
      title: "Beauty",
      description: "Get the best beauty products for your skin",
      image: "beauty.webp",
    },
    {
      title: "Fashion",
      description: "Stay stylish with our collection of fashionable clothes",
      image: "fashion.webp",
    },
  ];

  return (
    <div className="w-[90%] flex flex-col items-center">
      <div className="w-full text-2xl max-sm:text-xl text-center text-wrap py-6 font-bold">
        Explore through different Categories
      </div>
      <div className="categoryCards-container grid place-items-center gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-3 max-lg:w-full max-lg:gap-6 w-3/4">
        {categoryData.map((category, index) => {
          return (
            <Link
              to={`/companies/categories?category=${category.title.toLocaleLowerCase()}`}
              key={index}
              className="group items-stretch rounded-lg flex flex-col justify-between p-3 min-w-1/3 max-lg:scale-75 max-lg:maxh-[35vh] max-lg:m-1 bg-secondary hover:bg-primary transition-colors duration-300"
            >
              <div className="details flex flex-col group-hover:text-white transition-all duration-300 px-2 pt-4">
                <div className="pb-2 flex justify-between w-full">
                  <p className="font-semibold text-xl ">{category?.title}</p>
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
              <div className="w-full aspect-video overflow-hidden mt-4 rounded-lg ">
                <img
                  src={`categories/${category?.image}`}
                  alt={category.title}
                  className="w-full aspect-video rounded-lg object-cover group-hover:scale-110 transition-all duration-300"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
