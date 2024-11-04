import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import {
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import CountUp from "react-countup";

const AdminCards = () => {
  const { colorScheme } = useMantineColorScheme();

  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/stats`,{
            credentials: "include",
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="cards  py-4">
      <Carousel
        slideSize={{ base: "100%", md: "50%", lg: "33%" }}
        slideGap={{ base: "lg", md: "xl", lg: "xl" }}
        withControls={false}
        align="start"
      >
        {results && results?.data.map((carousel, index) => {
          return (
            <Carousel.Slide key={index}>
              <div
                className={`rounded-xl ${
                  colorScheme === "dark" ? "bg-zinc-800 border-gray-600" : "bg-transparent"
                } flex flex-col gap-2 px-4 py-2 border-b-8 border border-b-primary `}
              >
                <Group justify="space-between">
                  <div className="sub-heading !my-0 capitalize">{carousel?.name}</div>
                </Group>

                <Group justify="space-between" my="md" mb="xs">
                  <div className="text-2xl font-bold">
                    <CountUp end={carousel?.value} duration={2} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/${carousel?.name.toLowerCase()}`}
                      className="p-2 rounded-full border-r-2 border-primary hover:-rotate-45 transition-all duration-150"
                    >
                      <FaArrowRight />
                    </Link>
                    {carousel?.name.toLowerCase() === "categories" && (
                      <Link
                        to="/admin/categories/add"
                        className="p-2 aspect-square rounded-full border-r-2 border-primary hover:scale-110 transition-all duration-150"
                      >
                        <FaPlus />
                      </Link>
                    )}
                  </div>
                </Group>
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </div>
  );
};

export default AdminCards;
