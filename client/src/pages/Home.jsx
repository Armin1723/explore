import { useMantineColorScheme } from "@mantine/core";
import React from "react";
import { Header } from "../components/shared/Header";
import Info from "../components/home/Info";
// import CarouselSection from "../components/home/CarouselSection";
import CategorySection from "../components/home/CategorySection";
// import CallToAction from "../components/home/CallToAction";
import Footer from "../components/shared/Footer";
import { FAQ } from "../components/home/FAQ";
// import DetailsSection from "../components/home/DetailsSection";
// import ContactForm from "../components/home/ContactForm";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Testimonials from "../components/home/Testimonials";
import TrendingStores from "../components/home/TrendingStores";

const Home = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      className={`flex flex-col relative items-center min-h-screen max-sm:min-w-screen home ${
        colorScheme == "light" &&
        " "
      } `}
    >
      <div
        rounded="lg"
        className="content relative flex flex-col items-center gap- w-full bg-opacity-50 backdrop-blur-lg rounded-md"
      >

        <Header />
        <Hero />

        {/* <DetailsSection/> */}

        <Info />

        <About />

        {/* <CarouselSection /> */}

        {/* <Marquee /> */}

        <CategorySection />


        {/* <CallToAction /> */}

        <FAQ />

        <TrendingStores />

        <Testimonials />

      </div>

      <Footer />

    </div>
  );
};

export default Home;
