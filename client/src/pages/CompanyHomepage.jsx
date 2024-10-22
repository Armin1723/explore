import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/shared/Header";

const CompanyHomepage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col justify-between">
      <Header />
      <div className="flex flex-1 flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyHomepage;
