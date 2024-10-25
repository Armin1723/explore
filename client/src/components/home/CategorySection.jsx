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
      description: "Get the latest gadgets and all the electronics at the best prices",
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
      description: "Get the best beauty products for your skin and hair",
      image: "beauty.webp",
    },
    {
      title: "Fashion",
      description: "Stay stylish with our collection of fashionable clothes",
      image: "fashion.webp",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center py-12 max-sm:py-4 max-lg:py-6 bg-gradient-to-b from-secondary">
      <div className="w-full heading text-center md:my-8 max-lg:px-8">
        Explore through different Categories
      </div>
      <div className="categoryCards-container grid place-items-center gap-6 max-sm:grid-cols-1 max-lg:grid-cols-2 md:grid-cols-3 max-lg:w-full max-lg:gap-2 max-lg:m-8 w-[70%]">
        {categoryData.map((category, index) => {
          return (
            <Link
              to={`/companies/categories?category=${category.title.toLocaleLowerCase()}`}
              key={index}
              className="group items-stretch rounded-lg flex flex-col justify-between p-3 max-lg:m-4 bg-secondary hover:bg-primary transition-colors duration-300"
            >
              <div className="details flex flex-col group-hover:text-white transition-all duration-300 px-2 pt-4">
                <div className="pb-2 flex justify-between w-full">
                  <p className="sub-heading">{category?.title}</p>
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
              <div className="w-full aspect-[19/20] overflow-hidden mt-4 rounded-lg ">
                <img
                  // src={`categories/${category?.image}`}
                  src={`https://picsum.photos/200/300/?${category.title.toLocaleLowerCase()}`}
                  alt={category.title}
                  className="w-full aspect-[9/16] rounded-lg object-cover group-hover:scale-110 transition-all duration-300"
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
