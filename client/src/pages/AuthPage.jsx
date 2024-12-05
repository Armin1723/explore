import React, { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMantineColorScheme } from "@mantine/core";
import { Helmet } from "react-helmet-async";

const AuthPage = () => {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, []);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user?.name) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>Authentication | LinkIndia Portal</title>
        <meta
          name="description"
          content="LinkIndia Portal is a platform that helps you find the best businesses and services in your city. We provide a wide range of services including grocery, sports, electronics, fashion, books, and home essentials."
        />
        <meta
          name="keywords"
          content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
        />

        <meta name="author" content="LinkIndia Portal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Auth | LinkIndia Portal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/auth`}
        />
      </Helmet>

      {/* Content */}
      <div className="flex flex-col h-screen w-screen items-center justify-between">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
