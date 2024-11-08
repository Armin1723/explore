import React, { useEffect } from "react";
import AdminNav from "../components/admin/AdminNav";
import {
  Breadcrumbs,
  Burger,
  Card,
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
  }, [user]);

  return (
    <div
      className={`flex h-[100dvh] font-['inter'] overflow-y-scroll w-full overflow-x-hidden ${
        colorScheme === "light" && "bg-teal-100/20"
      }`}
    >
      <AdminNav />
      <div className="flex-1 flex flex-col p-4 ">
        <div className="top-ribbon flex justify-between items-center py-2 px-4 w-full rounded-md bg-gray-400/20">
          <div className="content px-4 flex flex-col gap-2 w-full">
            <div className="ribbon-right flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <div className="max-lg:flex hidden">
                  <Burger
                    opened={drawerOpened}
                    onClick={toggleDrawer}
                    hiddenFrom="sm"
                  />
                </div>
                <p>Dashboard</p>
              </div>
              <div className="flex gap-2">
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
        <p className="heading !my-2 !font-medium">
          Welcome {user?.name}{" "}
          <span className="max-sm:hidden">to the Admin Dashboard.</span>
        </p>

        {/* Small Nav For sm devices */}
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="80%"
          title="Explore"
          zIndex={1000000}
        >
          <AdminNavSmall />
        </Drawer>
        {/* Small Nav Ends */}

        <div className="hero flex-1 px-2 flex max-lg:flex-col gap-2 overflow-y-auto">
          <div className="right max-lg:w-full w-2/3 flex flex-col">
            <AdminCards />
            <Outlet />
          </div>

          <div className="recent-listing w-1/3 p-2 pt-4 max-lg:w-full min-h-fit max-h-[80vh max-sm:p-0">
            <Card
              withBorder
              className="!max-h-full flex flex-col justify-start"
            >
              <p className="text-2xl py-2 tracking wider">Recent Listing</p>
              <RecentListing refetch={refetch} setRefetch={setRefetch} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
