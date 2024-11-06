import React, { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useMantineColorScheme } from "@mantine/core";

const UserPage = () => {

  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, []);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.name) {
      notifications.show({
        title: "Error",
        message: "You must be logged in to view this page.",
        color: "red",
      });
      navigate("/auth");
    }
  }, [user]);
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
