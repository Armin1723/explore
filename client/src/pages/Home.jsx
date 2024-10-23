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

const Home = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      className={`flex flex-col items-center justify-start ${
        colorScheme == "light" &&
        "bg-gradient-to-br from-transparent min-h-screen to-teal-200/40"
      } `}
    >
      <Header />
      <Card
        rounded="lg"
        className="content flex flex-col w-[90vw] gap-8 bg-opacity-50 backdrop-blur-lg rounded-md min-h-[200vh]"
      >
        <Info />

        <DetailsSection/>

        <CarouselSection />

        <CategorySection />

        <CallToAction />

        <FAQ />
      </Card>

      <Footer />

    </div>
  );
};

export default Home;
