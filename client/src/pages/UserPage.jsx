import React from "react";
import { Header } from "../components/shared/Header";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const UserPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-between relative">
      <motion.img
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        src="/backgrounds/login-bg.svg"
        alt="ok"
        className="absolute bottom-0 left-0 h-[100dvh] w-screen z-[-2] object-cover max-sm:aspect-[1/1.4] "
      />
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
