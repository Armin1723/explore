import React, { useEffect } from "react";

import { Header } from "../components/shared/Header";
import CategorySection from "../components/home/CategorySection";
import Footer from "../components/shared/Footer";
import Hero from "../components/home/Hero";
import Testimonials from "../components/home/Testimonials";
import TrendingStores from "../components/home/TrendingStores";
import ContactCard from "../components/home/ContactCard";
import PopularStores from "../components/home/PopularStores";
import Suggestions from "../components/home/Suggestions";
import RecentlyReviewed from "../components/home/RecentlyReviewed";

import { useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import useLenis from "../hooks/useLenis";

const Home = () => {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme("light");
  }, []);

  useLenis();

  const user = useSelector((state) => state.user);

  return (
    <>
      {/* Description and Tags */}
      <Helmet>
        <title>Link India Portal - Find the Best Local Businesses</title>
        <meta
          name="description"
          content="Link India Portal helps you find the best local businesses in your area."
        />
        <meta
          name="keywords"
          content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
        />
        <meta name="author" content="Link India Portal" />
        <meta name="robots" content="index, follow" />  
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Link India Portal - Find the Best Local Businesses"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Link India Portal helps you find the best local businesses in your area."
        />
        <meta property="og:image" content="/logo/colored.png" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}`}
        />
      </Helmet>

      {/* Actual Content */}
      <Header />
      <div
        className={`flex flex-col items-center min-h-screen max-sm:min-w-screen home`}
      >

        <div
          rounded="lg"
          className="content relative flex flex-col items-center w-full"
        >
          <Hero />

          <CategorySection />

          {/* <Promotions /> */}

          <TrendingStores />

          <Suggestions />

          <PopularStores />

          {user && user?.name && <RecentlyReviewed />}

          <Testimonials />

          <ContactCard />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
