import { Image, Text, Group, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { FaStar } from "react-icons/fa";
import classes from "./admin.module.css";
import { Link } from "react-router-dom";

import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import { notifications } from "@mantine/notifications";
import striptags from "striptags";

const socket = io(import.meta.env.VITE_BACKEND_URL, { withCredentials: true });

export const RecentListing = ({ refetch, setRefetch }) => {
  const [listing, setListing] = useState(null);

  const handleRequest = async (action) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/requests/handle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            action,
            companyId: listing._id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("An error occurred while handling request");
      }
      const data = await response.json();
      notifications.clean();
      notifications.show({
        title: "Request handled",
        message: `Request for ${listing.name} has been ${
          action === "approve" ? "approved" : "rejected"
        }`,
      });
      setListing(null);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/recent-request`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if (!data.company) {
          setListing(null);
          return;
        }
        setListing(data.company);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListing();

    socket.on("newRequest", (company) => {
      notifications.clean();
      notifications.show({
        title: "New Request",
        message: `${company.name} has requested approval`,
      });
      setRefetch((prev) => !prev);
    });

    return () => {
      socket.off("newRequest");
    };
  }, [refetch]);

  return (
    <div className="flex-1 overflow-y-scroll w-full ">
      <Carousel
        withIndicators
        loop
        autoPlay
        radius="md"
        classNames={{
          root: classes.carousel,
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
        }}
      >
        {listing && listing.gallery.length > 0 ? (
          listing?.gallery?.map((image) => (
            <Carousel.Slide key={image}>
              <Image src={image.url?.replace(
                "upload/",
                "upload/w_400,h_200,c_fill/"
              )} height={200} className="aspect-video" />
            </Carousel.Slide>
          ))
        ) : (
          <Carousel.Slide>
            <Image
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
              height={220}
              className="aspect-video"
            />
          </Carousel.Slide>
        )}
      </Carousel>

      <Group justify="space-between" mt="lg" px="md">
        <Link to={listing && `/companies/${listing?.slug}`}>
          <Text fw={700} fz="xl">
            {listing?.name || "Company Name"}
          </Text>
        </Link>

        <Group gap={5} align="center">
          <FaStar color="gold" />
          <Text fz="sm" fw={600}>
            {(listing && listing?.cumulativeRating) || "N/A"}
          </Text>
        </Group>
      </Group>

      <div className="flex-1 max-h-[120px] overflow-y-auto">
        <Text
          fz="sm"
          c="dimmed"
          mt="sm"
          className="flex-1 text-justify"
          px="md"
        >
          {listing ? (
            <div>
              {striptags(listing?.description)
                .split(" ")
                .slice(0, 40)
                .join(" ")}
            </div>
          ) : (
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              molestias natus earum dolore asperiores! Repudiandae
              exercitationem inventore iste, tempora corrupti dolorum laboriosam
              laudantium natus ipsum fuga esse obcaecati perferendis aperiam
              nobis, ut nesciunt? Deleniti fugiat exercitationem, nam quibusdam!
              rbduentim.
            </>
          )}
          ...
        </Text>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button
          size="sm"
          color="brand.4"
          radius="md"
          onClick={() => handleRequest("approve")}
        >
          <TiTick size={24} /> <p className="">Approve</p>
        </Button>
        <Button
          size="sm"
          color="red.7"
          radius="md"
          onClick={() => handleRequest("reject")}
        >
          <RxCross1 size={18} className="font-bold" />{" "}
          <p className=" pl-2">Reject</p>
        </Button>
      </div>
    </div>
  );
};
