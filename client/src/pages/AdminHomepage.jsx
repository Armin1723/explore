import React, { useEffect } from "react";
import AdminNav from "../components/admin/AdminNav";
import {
  Anchor,
  Badge,
  Breadcrumbs,
  Button,
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
import LogoutButton from "../components/shared/LogoutAdmin";
import { Carousel } from "@mantine/carousel";
import { adminCarousels } from "../utils";
import CountUp from "react-countup";

const AdminHomepage = () => {
  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const location = useLocation();
  const items = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((i) => (
      <Link to={`${i == "admin" ? "/admin" : `/admin/${i}`}`} key={i}>
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
      className={`flex h-screen font-['inter'] overflow-y-scroll ${
        colorScheme === "light" && "bg-teal-100/20"
      }`}
    >
      <AdminNav />
      <div className="flex-1 flex flex-col p-4 ">
        <div className="top-ribbon flex justify-between items-center py-2 px-4 w-full  rounded-md bg-gray-400/20">
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
        <div className="hero flex-1 px-8 flex flex-col">
          <p className="text-2xl title mt-4">
            Welcome {user?.name} to the Admin Dashboard.
          </p>

          <div className="cards w-full py-4">
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
                        <Badge color={carousel.increase ? "green.8" : "red.6"}>
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
                        className={`w-full bg-blue-300 rounded-md my-2 text-center p-2 text-white hover:bg-blue-400 ${colorScheme === "dark" && "bg-gray-800 hover:bg-gray-900"}`}
                      >
                        Recent {carousel.name.split(" ")[1]}
                      </Link>
                    </Card>
                  </Carousel.Slide>
                );
              })}
            </CarouselComponent>
          </div>
          <div className="flex gap-4 ">
            <Outlet />
            <div className="trending-company-details w-1/3 max-lg:hidden">
              <Card shadow="lg" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500} size="xl">
                    Trending Company
                  </Text>
                </Group>
                <img src='' alt="stock" className="w-full" />
                
                <div className="flex flex-col">
                  <Text>Name: ABC Corp</Text>
                  <Text>Sales: 500</Text>
                  <Text>Revenue: $1,000,000</Text>
                  <Text>Employees: 150</Text>
                </div>

                <Button href="/admin/company-details" my="lg" color="blue.3">
                  View More
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
