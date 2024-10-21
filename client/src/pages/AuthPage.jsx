import React, { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";

const AuthPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("user")) || null;
        // if (user && user.name) {
        //     notifications.clean()
        //     notifications.show({
        //         title: "Logged In",
        //         message: "You are already logged in.",
        //         color: "green",
        //     });
        //     navigate("/");
        // }
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
