import { useSelector } from "react-redux";

export const categoriesBackup = [
  {name: 'Grocery', subCategories: ["vegetables", "fruits", "dairy"]},
  {name: 'Electronics', subCategories: ["mobiles", "laptops", "cameras"]},
  {name: 'Books', subCategories: ["fiction", "non-fiction", "comics"]},
  {name: 'Home', subCategories: ["furniture", "decor", "kitchen"]},
  {name: 'Beauty', subCategories: ["skincare", "makeup", "haircare"]},
  {name: 'Fashion', subCategories: ["men", "women", "kids"]},
  {name: 'Toys', subCategories: ["action figures", "dolls", "puzzles"]},
  {name: 'Sports', subCategories: ["outdoor", "indoor", "fitness"]},
  {name: 'Automobile', subCategories: ["cars", "motorbikes", "accessories"]},
  {name: 'Furniture', subCategories: ["sofas", "tables", "beds"]},
  {name: 'Jewellery', subCategories: ["rings", "necklaces", "bracelets"]},
  {name: 'Travel', subCategories: ["flights", "hotels", "tours"]},
  {name: 'Fitness', subCategories: ["gym equipment", "supplements", "clothing"]},
  {name: 'Pets', subCategories: ["food", "toys", "accessories"]},
  {name: 'Health', subCategories: ["medicines", "wellness", "personal care"]},
  {name: 'Kitchen', subCategories: ["appliances", "cookware", "utensils"]}
];

  export const upperMarquee = [
    "/01.svg",
    "/02.svg",
    "/03.svg",
    "/04.svg",
    "/05.svg",
    "/06.svg",
    "/07.svg",
    "/08.svg",
    "/09.svg",
    "/10.svg",
    "/11.svg",
  ];

  export const lowerMarquee = [
    "/12.svg",
    "/13.svg",
    "/14.svg",
    "/15.svg",
    "/16.svg",
    "/17.svg",
    "/18.svg",
    "/19.svg",
    "/20.svg",
    "/21.svg",
    "/22.svg",
  ];

export const getRatingColor = (rating) => {
  
  const darkRed = 50;   
  const darkGreen = 90; 

  const red = Math.round((1 - rating / 5) * (255 - darkRed) + darkRed);
  const green = Math.round((rating / 5) * (255 - darkGreen) + darkGreen);
  
  return `rgb(${red}, ${green}, 0)`;
};

export const getSubCategories = (categoryName) => {
  const categories = useSelector((state) => state.categories);
  const category = Object.values(categories).find(cat => cat.name === categoryName);
  return category ? category.subCategories : null; 
};

export const formatDate = (date) => {
  const options = { 
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit" 
  };
  return new Date(date).toLocaleDateString(undefined, options);
};


