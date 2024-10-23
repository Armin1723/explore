import { Card, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { Header } from "../components/shared/Header";
import Info from "../components/home/Info";
import CarouselSection from "../components/home/CarouselSection";

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
        shadow="xl"
        className="content flex flex-col w-[90vw] gap-8 bg-opacity-50 backdrop-blur-lg rounded-md min-h-[200vh]"
      >
        <Info />

        <CarouselSection />
      </Card>
    </div>
  );
};

export default Home;
