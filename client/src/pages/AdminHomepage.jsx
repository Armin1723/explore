import React, { useEffect } from "react";
import AdminNav from "../components/admin/AdminNav";
import { Breadcrumbs, Button, useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Text } from "@mantine/core";
import { FaHome } from "react-icons/fa";
import ThemeToggle from "../components/shared/ThemeToggle";
import { MdLogout } from "react-icons/md";

const AdminHomepage = () => {
  const { toggleColorScheme, setColorScheme, colorScheme } =
    useMantineColorScheme({
      keepTransitions: true,
    });

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const location = useLocation();
  const items = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((i) => (
      <Link to={`/${i}`} key={i}>
        {i}
      </Link>
    ));
  useEffect(() => {
    if (!user || !user.role == "admin") {
      navigate("/admin/login");
    }
  }, []);

  return (
    <div
      className={`flex h-screen font-['inter'] ${
        colorScheme === "light" && "bg-teal-100/20"
      }`}
    >
      <AdminNav />
      <div className="flex-1 flex flex-col p-4">
        <div className="top-ribbon flex justify-between items-center py-2 px-4 w-full mt-4 rounded-md bg-gray-300/40">
          <div className="content px-4 flex flex-col gap-2">
            <p>Dashboard</p>
            <div className="flex gap-2 items-center">
              <FaHome className="text-xl" />
              <p>/</p>
              <Breadcrumbs>{items}</Breadcrumbs>
            </div>
          </div>
         <div className="flex gap-2">
         <ThemeToggle />
          <Button>
            <MdLogout /> <span className="max-sm:hidden">Logout</span>
          </Button>
         </div>
        </div>
        <div className="flex-1 px-8">
          <p className="text-2xl title mt-4">
            Welcome {user.name} to the Admin Dashboard.
          </p>
          <div className="cards grid max-sm:grid-cols-1"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
