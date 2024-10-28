import React, { useEffect } from "react";

import { Header } from "../components/shared/Header";
// import Info from "../components/home/Info";
import CategorySection from "../components/home/CategorySection";
import Footer from "../components/shared/Footer";
import Hero from "../components/home/Hero";
// import About from "../components/home/About";
import Testimonials from "../components/home/Testimonials";
import TrendingStores from "../components/home/TrendingStores";
import ContactCard from "../components/home/ContactCard";
import PopularStores from "../components/home/PopularStores";
import Suggestions from "../components/home/Suggestions";
import RecentlyReviewed from "../components/home/RecentlyReviewed";

import { useMantineColorScheme } from "@mantine/core";

const Home = () => {
  const { colorSceme, toggleColorScheme } = useMantineColorScheme();
  useEffect(() => {
    if (colorSceme === "dark") {
      toggleColorScheme();
    }
  }, []);

  return (
    <div
      className={`flex flex-col items-center min-h-screen max-sm:min-w-screen home `}
    >
      <Header />

      <div
        rounded="lg"
        className="content relative flex flex-col items-center w-full "
      >
        <Hero />

        <CategorySection />

        <TrendingStores />

        <Suggestions />

        <PopularStores />

        <RecentlyReviewed />

        {/* <About /> */}

        {/* <FAQ /> */}

        <Testimonials />

        <ContactCard />

      <Footer />
      </div>


    </div>
  );
};

export default Home;
