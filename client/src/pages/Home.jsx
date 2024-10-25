import { useMantineColorScheme } from "@mantine/core";
import React from "react";
import { Header } from "../components/shared/Header";
import Info from "../components/home/Info";
import CategorySection from "../components/home/CategorySection";
import Footer from "../components/shared/Footer";
// import { FAQ } from "../components/home/FAQ";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Testimonials from "../components/home/Testimonials";
import TrendingStores from "../components/home/TrendingStores";
import ContactCard from "../components/home/ContactCard";
import PopularStores from "../components/home/PopularStores";

const Home = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      className={`flex flex-col relative items-center min-h-screen max-sm:min-w-screen home ${
        colorScheme == "light" &&
        "bg-secondary "
      } `}
    >
      <div
        rounded="lg"
        className="content relative flex flex-col items-center gap- w-full bg-opacity-50 backdrop-blur-lg rounded-md"
      >

        <Header />

        <Hero />

        <CategorySection />

        <Info />

        <PopularStores />

        <About />


        {/* <FAQ /> */}

        <TrendingStores />

        <Testimonials />

        <ContactCard />

      </div>

      <Footer />

    </div>
  );
};

export default Home;
