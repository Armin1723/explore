import React from "react";
import { Link } from "react-router-dom";

const CategorySection = () => {
  
  const categoryData = [
    {
      title: "Grocery",
      image: "grocery.webp",
    },
    {
      title: "Electronics",
      image: "electronics.webp",
    },
    {
      title: "Books",
      image: "books.webp",
    },
    {
      title: "Home",
      image: "home.webp",
    },
    {
      title: "Beauty",
      image: "beauty.webp",
    },
    {
      title: "Fashion",
      image: "fashion.webp",
    },
    {
      title: "Toys",
      image: "toys.webp",
    },
    {
      title: "Sports",
      image: "sports.webp",
    },
    {
      title: "Automobile",
      image: "automobile.webp",
    },
    {
      title: "Furniture",
      image: "furniture.webp",
    },
    {
      title: "Jewellery",
      image: "jewellery.webp",
    },
    {
      title: "Travel",
      image: "travel.webp",
    },
    {
      title: "Fitness",
      image: "fitness.webp",
    },
    {
      title: "Pets",
      image: "pets.webp",
    },
    {
      title: "Health",
      image: "health.webp",
    },
    {
      title: 'Kitchen',
      image: 'kitchen.webp'
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
              to={`/companies/categories/${category.title.toLowerCase()}`}
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
