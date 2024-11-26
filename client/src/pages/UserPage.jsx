import React, { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { Modal, useMantineColorScheme } from "@mantine/core";
import AuthModal from "../components/shared/AuthModal";
import { useDisclosure } from "@mantine/hooks";
import { Helmet } from "react-helmet-async";

const UserPage = () => {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, []);

  const [opened, { open, close }] = useDisclosure(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user || !user.name) {
    notifications.show({
      title: "Error",
      message: "You must be logged in to view this page.",
      color: "red",
    });

    const closeModal = () => {
      close(); 
      if (window.history.length > 2) {
        navigate(-1); 
      } else {
        navigate("/");
      }
    };
    return (
      <Modal opened={true} onClose={closeModal} size="auto" centered>
        <AuthModal close={close} />
      </Modal>
    );
  }

  return (
    <>
    {/* Description and Tags */}
    <Helmet>
    <title>Users | Explore Portal</title>
    <meta
      name="description"
      content="Explore Portal helps you find the best local businesses in your area."
    />
    <meta
      name="keywords"
      content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
    />
    <meta name="author" content="Explore Portal" />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Users | Explore Portal" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={`${import.meta.env.VITE_FRONTEND_URL}/users/${user?._id}`} />
  </Helmet>

  {/* Actual Content */}
    <div className="flex flex-col min-h-screen w-screen overflow-hidden items-center justify-between relative">
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
        className="absolute bottom-0 left-0 min-h-[100dvh] w-screen z-[-2] object-cover max-sm:aspect-[1/1.4] "
      />
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <Outlet />
      </div>
    </div>
    </>
  );
};

export default UserPage;
