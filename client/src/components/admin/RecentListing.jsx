import { Image, Card, Text, Group, Button, rem } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { FaStar } from "react-icons/fa";
import classes from "./admin.module.css";
import { Link } from "react-router-dom";

import { TiTick } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";

export const RecentListing = () => {
  const [refetch, setRefetch] = useState(false);
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
      setListing(data.company);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/recent-request`,{
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if(!data.company){
            return
        } 
        setListing(data.company);
      } catch (error) {
        console.error(error);
      }
    };
    fetchListing();
  }, [refetch]);

  return (
    <Card radius="md" withBorder padding="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          autoPlay
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {listing ? (
            listing?.gallery?.map((image) => (
              <Carousel.Slide key={image}>
                <Image src={image} height={220} className="aspect-video" />
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
      </Card.Section>

      <Group justify="space-between" mt="lg">
        <Link to="/">
          <Text fw={500} fz="lg">
            {listing?.name || "Company Name"}
          </Text>
        </Link>

        <Group gap={5} align="center">
          <FaStar color="gold" />
          <Text fz="sm" fw={600}>
            {listing && listing?.rating || 4.5}
          </Text>
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mt="sm">
        {listing ? (
          listing.description.split(" ").slice(0, 20).join(" ")
        ) : (
          <>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est nobis
            sit porro dicta quae eius, obcaecati molestiae velit quo sed.
          </>
        )}
        ...
      </Text>

      <Group justify="space-around" mt="lg" >
        <Button
          size="sm"
          color="green.7"
          radius="md"
          onClick={() => handleRequest("approve")}
        >
          <TiTick size={24} /> <p className="">Approve</p>
        </Button>
        <Button
          size="sm"
          color="red"
          radius="md"
          onClick={() => handleRequest("approve")}
        >
          <RxCross1 size={18} className="font-bold" />{" "}
          <p className=" pl-2">Reject</p>
        </Button>
      </Group>
    </Card>
  );
};
