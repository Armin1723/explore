import React from "react";
import { Header } from "../components/shared/Header";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default UserPage;
