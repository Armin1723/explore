import React, { useState } from "react";
import { motion } from "framer-motion";

const MarqueeItem = ({ images, from, to }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex MyGradient ">
      <motion.div
        initial={{ x: `${from}` }}
        animate={ !isHovered ? { x: `${to}` } : {}}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
          className={`flex flex-shrink-0 items-center justify-center`}
      >
        {images.map((image, index) => {
          return (
            <img
              className="h-28 w-40 max-lg:h-12 max-lg:w-28 px-10 flex items-center justify-center text-black fill-black stroke-black hover:scale-125 max-lg:scale-125 max-lg:hover:scale-150 cursor-pointer transition-all duration-500"
              src={`/images/${image}`}
              key={index}
            />
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: `${from}` }}
        animate={ !isHovered ? { x: `${to}` } : {}}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`flex flex-shrink-0 items-center justify-center`}
      >
        {images.map((image, index) => {
          return (
            <img
              className="h-28 w-40 max-lg:h-12 max-lg:w-28 px-10 mix-blen-difference text-black fill-black stroke-black hover:scale-125 max-lg:scale-125 max-lg:hover:scale-150 cursor-pointer transition-all duration-500"
              src={`/images/${image}`}
              key={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default MarqueeItem;
