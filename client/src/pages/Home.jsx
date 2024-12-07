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
// import Promotions from "../components/home/Promotions";

const Home = () => {
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme("light");
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <>
      {/* Description and Tags */}
      <Helmet>
        <title>LinkIndia Portal - Find the Best Local Businesses</title>
        <meta
          name="description"
          content="LinkIndia Portal helps you find the best local businesses in your area."
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
