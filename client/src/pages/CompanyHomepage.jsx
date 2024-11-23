import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { useMantineColorScheme } from "@mantine/core";

const CompanyHomepage = () => {

  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, []);

  return (
    <div className={`flex min-h-screen w-screen flex-col justify-between bg-gradient-to-b from-white to-secondary`}>
      <Header />
      <div className="flex flex-1 flex-col items-center bg-transparent backdrop-blur-md pt-[9vh]" >
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyHomepage;
