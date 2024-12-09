import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  
  const categoryData = [
    {
      title: "Grocery",
      image: "grocery.png",
    },
    {
      title: "Electronics",
      image: "electronics.png",
    },
    {
      title: "Books",
      image: "books.png",
    },
    {
      title: "Home",
      image: "home.png",
    },
    {
      title: "Beauty",
      image: "beauty.png",
    },
    {
      title: "Fashion",
      image: "fashion.png",
    },
    {
      title: "Toys",
      image: "toys.png",
    },
    {
      title: "Sports",
      image: "sports.png",
    },
    {
      title: "Automobile",
      image: "automobile.png",
    },
    {
      title: "Furniture",
      image: "furniture.png",
    },
    {
      title: "Jewellery",
      image: "jewellery.png",
    },
    {
      title: "Travel",
      image: "travel.png",
    },
    {
      title: "Fitness",
      image: "fitness.png",
    },
    {
      title: "Pets",
      image: "pets.png",
    },
    {
      title: "Health",
      image: "health.png",
    },
    {
      title: 'Kitchen',
      image: 'kitchen.png'
    }
    
  ];

  return (
    <div className="w-full relative flex flex-col items-center max-h-fit bg-gradient-to-b from-secondary border-t border-neutral-300/50 ">
      <p className="heading w-[90%] max-lg:py-2 text-center pb-2 pt-4">
        Categories
      </p>

      <div className="icons-container grid max-lg:grid-cols-5 md:grid-cols-8 items-center gap-4 max-sm:gap-2 w-[90%]  ">
        {categoryData.map((category, index) => {
          return(
            <Link
              to={`/companies/categories?category=${category.title.toLowerCase()}`}
              key={index}
              className={`group flex flex-col items-center gap-1 max-sm:p-1 ${index === categoryData.length - 1 && 'max-lg:hidden md:flex'}`}
            >
              <div className="icon-container rounded-lg aspect-square p-3 border-[0.5px] group-hover:shadow-[0_0_8px_gray] !shadow-gray-300/50 max-sm:group-hover:border-black max-sm:group-hover:shadow-none flex items-center justify-center transition-all duration-150">
                <img src={`icon/${category.image}`} alt={category.title} className="w-14 max-lg:w-12 aspect-square group-hover:scale-[1.05] transition-all duration-300"/>
              </div>
              <p className="font-['poppins'] text-sm max-sm:text-xs text-center group-hover:text-gray-800 group-hover:max-sm:text-black transition-colors duration-200">{category.title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default CategorySection;
