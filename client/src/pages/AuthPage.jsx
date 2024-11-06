import React, { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMantineColorScheme } from "@mantine/core";

const AuthPage = () => {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, []);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user?.name) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
