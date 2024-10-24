import { Card, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { Header } from "../components/shared/Header";
import Info from "../components/home/Info";
import CarouselSection from "../components/home/CarouselSection";
import CategorySection from "../components/home/CategorySection";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/shared/Footer";
import { FAQ } from "../components/home/FAQ";
import DetailsSection from "../components/home/DetailsSection";
import ContactForm from "../components/home/ContactForm";
import Hero from "../components/home/Hero";

const Home = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        colorScheme == "light" &&
        " "
      } `}
    >
      <div
        rounded="lg"
        className="content flex flex-col items-center gap-8 bg-opacity-50 backdrop-blur-lg rounded-md min-h-[200vh]"
      >

        <Header />
        <Hero/ >
        <DetailsSection/>

        <Info />


        <CarouselSection />

        <CategorySection />

        <CallToAction />

        <FAQ />
        <ContactForm />

      </div>

      <Footer />

    </div>
  );
};

export default Home;
