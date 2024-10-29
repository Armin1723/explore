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
    // <div className="w-full flex flex-col items-center py-12 max-sm:py-4 max-lg:py-6 bg-gradient-to-b from-secondary to-white">
    //   <div className="w-full heading text-center md:my-8 max-lg:px-8">
    //     Explore through different Categories
    //   </div>
    //   <div className="categoryCards-container grid place-items-center gap-6 max-sm:grid-cols-2 max-lg:grid-cols-3 md:grid-cols-5 max-lg:w-full max-lg:gap-2 max-lg:m-8 w-[90%]">
    //     {categoryData.map((category, index) => {
    //       return (
    //         <Link
    //           to={`/companies/categories?category=${category.title.toLocaleLowerCase()}`}
    //           key={index}
    //           className="group items-stretch rounded-lg flex flex-col justify-between p-3 max-lg:m-4 bg-secondary hover:bg-primary transition-colors duration-300"
    //         >
    //           <div className="details flex flex-col group-hover:text-white transition-all duration-300 px-2 pt-4">
    //             <div className="pb-2 flex justify-between w-full">
    //               <p className="sub-heading">{category?.title}</p>
    //               <div className="icon p-2 rounded-full border border-gray-500/50 group-hover:-rotate-45 group-hover:bg-accent transition-all duration-300">
    //                 <MdArrowRightAlt size={24} />
    //               </div>
    //             </div>
    //             <p className="font-light">
    //               {category?.description?.split(" ").length > 20
    //                 ? category?.description?.split(" ").slice(10).join(" ")
    //                 : category?.description}
    //             </p>
    //           </div>
    //           <div className="w-full aspect-[4/3] overflow-hidden mt-4 rounded-lg ">
    //             <img
    //               // src={`categories/${category?.image}`}
    //               src={`https://picsum.photos/200/300/?${category.title.toLocaleLowerCase()}`}
    //               alt={category.title}
    //               className="w-full aspect-[9/16] rounded-lg object-cover group-hover:scale-110 transition-all duration-300"
    //             />
    //           </div>
    //         </Link>
    //       );
    //     })}
    //   </div>
    // </div>

    <div className="w-full flex flex-col items-center bg-gradient-to-b from-secondary border-t border-black">
      <p className="heading w-[90%] py-6 max-lg:py-2 ">
        Categories
      </p>
      <div className="icons-container grid max-lg:grid-cols-5 grid-cols-8 items-center gap-4 w-4/5 my-8 max-lg:my-6 max-sm:my-2 max-sm:w-[90%]">
        {categoryData.map((category, index) => {
          return(
            <Link
              to={`/companies/categories?category=${category.title.toLowerCase()}`}
              key={index}
              className={`group flex flex-col items-center gap-1 max-sm:p-1 ${index === categoryData.length - 1 && 'max-sm:hidden'}`}
            >
              <div className="icon-container rounded-lg aspect-square p-3 group-hover:border-accent border-[0.5px] group-hover:shadow-[0_0_8px_orange] shadow-accent/10 max-sm:group-hover:border-black max-sm:group-hover:shadow-none flex items-center justify-center transition-all duration-150">
                <img src={`icon/${category.image}`} alt={category.title} className="w-12 aspect-square group-hover:scale-[1.05] transition-all duration-300"/>
              </div>
              <p className="text-sm font-['inter'] max-sm:text-xs text-center group-hover:text-accent group-hover:max-sm:text-black transition-colors duration-200">{category.title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default CategorySection;
