import React, { useEffect, useState } from "react";
import AdminNav from "../components/admin/AdminNav";
import {
  Badge,
  Breadcrumbs,
  Card,
  Group,
  Progress,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import CarouselComponent from "../components/shared/CarouselComponent";
import { FaArrowDown, FaArrowUp, FaHome } from "react-icons/fa";
import ThemeToggle from "../components/shared/ThemeToggle";
import LogoutButton from "../components/admin/LogoutAdmin";
import { Carousel } from "@mantine/carousel";
import { adminCarousels } from "../utils";
import CountUp from "react-countup";
import { RecentListing } from "../components/admin/RecentListing";

const AdminHomepage = ({refetch, setRefetch}) => {
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

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
      className={`flex h-[100dvh] font-['inter'] overflow-y-scroll ${
        colorScheme === "light" && "bg-teal-100/20"
      }`}
    >
      <AdminNav />
      <div className="flex-1 flex flex-col p-4 ">
        <div className="top-ribbon flex justify-between items-center py-2 px-4 w-full rounded-md bg-gray-400/20">
          <div className="content px-4 flex flex-col gap-2">
            <p>Dashboard</p>
            <div className="flex gap-2 items-center">
              <Link to="/admin">
                <FaHome className="text-xl" />
              </Link>
              <p>/</p>
              <Breadcrumbs>{items}</Breadcrumbs>
            </div>
          </div>
          <div className="flex gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
        <p className="text-2xl title mt-4">
          Welcome {user?.name} to the Admin Dashboard.
        </p>

        <div className="hero flex-1 px-2 flex max-lg:flex-col gap-2 overflow-y-auto">
          <div className="right max-lg:w-full w-2/3 flex flex-col">
            <div className="cards  py-4">
              <CarouselComponent totalSlides={1}>
                {adminCarousels.map((carousel, index) => {
                  return (
                    <Carousel.Slide key={index}>
                      <Card shadow="lg" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mt="md" mb="xs">
                          <Text fw={500} size="xl">
                            {carousel.name}
                          </Text>
                        </Group>

                        <Group justify="space-between" my="md" mb="xs">
                          <Group justify="start">
                            {carousel.increase ? (
                              <FaArrowUp color="green" size={24} />
                            ) : (
                              <FaArrowDown color="red" size={24} />
                            )}
                            <div className="text-2xl font-bold">
                              <CountUp end={carousel.value} duration={2} />
                            </div>
                          </Group>
                          <Badge
                            color={carousel.increase ? "green.8" : "red.6"}
                          >
                            {carousel.progress} %
                          </Badge>
                        </Group>

                        <Progress
                          value={carousel.progress}
                          size="sm"
                          color={carousel.increase ? "teal" : "red"}
                          transitionDuration={500}
                          style={() => ({
                            boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
                            borderRadius: "8px",
                            margin: "2px 0",
                          })}
                        />
                        <Link
                          to={`/admin/${carousel.name
                            .split(" ")[1]
                            .toLowerCase()}`}
                          my="lg"
                          color="blue.3"
                          className={`w-full bg-blue-300 rounded-md my-2 text-center p-2 text-white hover:bg-blue-400 ${
                            colorScheme === "dark" &&
                            "bg-gray-800 hover:bg-gray-900"
                          }`}
                        >
                          Recent {carousel.name.split(" ")[1]}
                        </Link>
                      </Card>
                    </Carousel.Slide>
                  );
                })}
              </CarouselComponent>
            </div>
            <Outlet/>
          </div>

          <div className="recent-listing w-1/3 p-2 pt-4 max-lg:w-full min-h-fit max-h-[80vh max-sm:p-0">
            <Card withBorder className="!max-h-full flex flex-col justify-start">
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
