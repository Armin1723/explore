import React, { useEffect } from "react";
import AdminNav from "../components/admin/AdminNav";
import {
  Breadcrumbs,
  Burger,
  Drawer,
  useMantineColorScheme,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RecentListing } from "../components/admin/RecentListing";
import AdminCards from "../components/admin/AdminCards";
import { useDisclosure } from "@mantine/hooks";
import AdminNavSmall from "../components/admin/AdminNavSmall";
import UserProfile from "../components/shared/UserProfile";
import ThemeToggle from "../components/shared/ThemeToggle";
import { Helmet } from "react-helmet-async";
import Logo from "../components/shared/Logo";

const AdminHomepage = ({ refetch, setRefetch }) => {
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const location = useLocation();
  const items = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((i, index, arr) => {
      const path = arr.slice(0, index + 1).join("/");
      return (
        <Link to={`/${path}`} key={i}>
          {i}
        </Link>
      );
    });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, []);

  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>Admin Panel | Link India Portal</title>
        <meta
          name="description"
          content="Link India Portal is a platform that helps you find the best businesses and services in your city. We provide a wide range of services including grocery, sports, electronics, fashion, books, and home essentials."
        />
        <meta
          name="keywords"
          content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
        />

        <meta name="author" content="Link India Portal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Admin Panel | Link India Portal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Admin Panel | Link India Portal"
        />
        <meta property="og:image" content="/logo/colored.png" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/admin`}
        />
      </Helmet>

      {/* Content */}
      <div
        className={`flex h-[100dvh] overflow-auto w-full ${
          colorScheme === "light" && "bg-secondary"
        }`}
      >
        <AdminNav />
        <div className="flex-1 flex flex-col p-4 overflow-y-hidden ">
          <div className="top-ribbon flex justify-between items-center py-2 w-full rounded-md bg-gray-400/20">
            <div className="content px-4 flex flex-col gap-2 w-full">
              <div className="ribbon-right flex items-center justify-between w-full">
                <div className="flex items-center gap-1">
                  <div className="flex lg:hidden">
                    <Burger
                      opened={drawerOpened}
                      onClick={toggleDrawer}
                    />
                  </div>
                  <p>Dashboard</p>
                </div>
                <div className="flex gap-2 items-center">
                  <ThemeToggle />
                  <UserProfile />
                </div>
              </div>
              <div className="ribbon-left flex gap-2 items-center">
                <Link to="/admin">
                  <FaHome className="text-xl" />
                </Link>
                <p>/</p>
                <Breadcrumbs>{items}</Breadcrumbs>
              </div>
            </div>
          </div>
          <div className="welcome my-2 flex items-center gap-1">
            <p className="heading !my-2 !font-medium capitalize">
              Welcome{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-brand to-violet-600 font-bold">
                {user?.name}
              </span>{" "}
              <span className="max-sm:hidden">to the Admin Dashboard.</span>
            </p>

            {/* Small Nav For sm devices */}
            <Drawer
              opened={drawerOpened}
              onClose={closeDrawer}
              size="80%"
              title={
                <Logo variant={colorScheme === "light" ? "colored" : "white"} />
              }
              zIndex={9999}
            >
              <AdminNavSmall closeDrawer={closeDrawer} />
            </Drawer>
            {/* Small Nav Ends */}
          </div>

          <div className="hero flex-1 px-2 flex max-lg:flex-col gap-3 overflow-y-auto">
            <div className="right max-lg:w-full w-2/3 gap-2 flex flex-col min-h-fit max-h-full overflow-y-auto">
              <AdminCards />
              <Outlet />
            </div>

            <div
              className={`recent-listing block md:hidden lg:block w-1/3 py-2 pt-3 max-lg:w-full min-h-fit max-h-full max-sm:p-0 my-1 gap-2 rounded-md border border-neutral-500/20 ${
                colorScheme === "light" ? "bg-white" : "bg-zinc-800"
              }`}
            >
              <p className="text-xl my-4 tracking wider pl-4 border-l-4 mx-3 border-primary">
                Recent Listing
              </p>
              <RecentListing refetch={refetch} setRefetch={setRefetch} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomepage;
