import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  Paper,
  Title,
  Avatar,
  Group,
  Rating,
  Badge,
  Textarea,
  Menu,
} from "@mantine/core";

import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaShare,
  FaEllipsisV,
  FaFlag,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { Button } from "@mantine/core";

const CompanyDetail = () => {
  let { name } = useParams();
  const [company, setCompany] = React.useState(null);
  const [tabState, setTabState] = React.useState("contact");

  const [review, setReview] = React.useState({ rating: 0, comment: "" });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/company/name/${name}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        setCompany(data.company);
      } catch (error) {
        console.log(error.message);
        notifications.show({
          title: "Error",
          message: error.message,
          color: "red",
        });
      }
    };
    fetchCompany();
  }, []);

  if (!company) return <div className="w-full h-screen flex items-center justify-center"><div className="loader"></div></div>;

  const addReview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/review/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review, companyName: company.name }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      notifications.show({
        title: "Review submitted",
        message: data.message,
        color: "teal",
      });
      setCompany(data.company);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  const flagReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/company/review/flag/${reviewId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      notifications.show({
        title: "Review flagged",
        message: data.message,
        color: "teal",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <Paper
      withBorder
      radius="lg"
      shadow="lg"
      className="flex flex-col flex-1 w-full items-center px-4 my-8 p-6 shadow-lg rounded-lg bg-transparent backdrop-blur-md"
    >
      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "50%" }}
        slideGap={{ base: "lg", sm: "md" }}
        align="start"
        loop
        className="w-full !rounded-lg"
      >
        {company.gallery.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={company.name}
            className="object-cover aspect-video h-96 max-sm:h-60 rounded-lg"
          />
        ))}
      </Carousel>

      <div className="company-detail-container flex flex-col w-[70%] md:pl-12 max-sm:w-full">
        
        <div className="flex gap-4 items-center justify-start my-6 ">
          <Avatar src={company.logo.url} alt={company.name} size="xl" />
          <Title my="md" fw="700" order={2} className="flex-1 ">
            {company.name}
          </Title>
          {company.status === "pending" && (
            <Badge color="yellow" variant="filled">
              Pending
            </Badge>
          )}
        </div>

        <div
          id="ratings"
          className="ratings flex flex-col items-start gap-2 my-4"
        >
          <Group align="center" justify="start">
            <Rating value={company?.cumulativeRating} readOnly size="lg" />
            <div
              className="text-md font-semibold p-2 aspect-square rounded-lg flex items-center gap-1"
              style={{
                backgroundColor:
                  company.cumulativeRating >= 4
                    ? "green"
                    : company.cumulativeRating >= 2
                    ? "yellow"
                    : "red",
                color: "white",
              }}
            >
              {company?.cumulativeRating}
              <FaStar />
            </div>
          </Group>
          <div className="text-md text-gray-600">
            {company.reviews.length} reviews{" "}
          </div>
        </div>

        <div className="tabs w-full max-sm:text-xs flex">
            {["contact", "address", "description", "reviews"].map(
              (item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`px-4 my-2 py-2 cursor-pointer rounded-lg ${
                      item === tabState &&
                      "border-b-2 border-blue-500 font-semibold"
                    }`}
                    onClick={() => {
                      document.getElementById(item).scrollIntoView({
                        behavior: "smooth",
                      });
                      setTabState(item);
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </div>
                );
              }
            )}
        </div>

        <div
          id="address"
          className="address flex justify-start items-center gap-4"
        >
          <p className="text-lg flex items-center gap-2">
            <FaMapMarkerAlt />
            {company.address}
          </p>
          <div className="joined">
            <span className="text-sm text-gray-500">
              Joined on {new Date(company.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div id="contact" className="contact my-4">
          <Group position="apart">
            <Button
              component="a"
              href={`tel:${company.phone.number}`}
              variant="filled"
              color="green.8"
            >
              <FaPhone className="mx-2" />
              {company?.phone?.number}
            </Button>
            <Button
              component="a"
              href={`https://wa.me/${company.phone.number}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="filled"
              color="green"
            >
              <FaWhatsapp className="mx-2" />
              WhatsApp
            </Button>
            <Button
              component="a"
              href={`mailto:${company.email}`}
              variant="filled"
              color="red"
            >
              <FaEnvelope className="mx-2" />
              {company.email}
            </Button>
            <Button
              onClick={() => {
                navigator.share({
                  title: company.name,
                  text: `Check out ${company.name}`,
                  url: window.location.href,
                });
              }}
              variant="filled"
              color="blue"
            >
              <FaShare className="mx-2" />
              Share
            </Button>
          </Group>
        </div>

        <div id="description">
          <Title order={2} my={"lg"} className="my-8 font-bold">
            Description
          </Title>
          <div
            className="w-full max-sm:text-sm font-['inter'] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: company.description }}
          ></div>
        </div>

        <div className="add-review my-8">
          <Title order={3} className="mb-4">
            Add Your Review
          </Title>
          <Group direction="column" spacing="sm">
            <Rating
              size="lg"
              my="md"
              value={review.rating}
              onChange={(e) => setReview({ ...review, rating: e })}
            />
            <Textarea
              className="w-full p-2 rounded-lg"
              rows="4"
              placeholder="Write your review here..."
              value={review.comment}
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            ></Textarea>
            <Button variant="filled" color="blue" onClick={addReview}>
              Submit Review
            </Button>
          </Group>
        </div>

        <div id="reviews" className="reviews">
          <Title order={3} className="mb-4">
            Reviews
          </Title>
          {company.reviews.slice(0, 10).map((review, index) => (
            <Paper
              key={index}
              withBorder
              className="p-4 mb-4 shadow-sm rounded-lg w-full"
            >
              <Group position="apart" justify="space-between">
                <Group>
                  <Avatar src={review?.user?.profilePic} alt={review.user.name} />
                  <div>
                    <Title order={5}>{review.user.name}</Title>
                    <Rating value={review.rating} readOnly size="sm" />
                  </div>
                  <span className="text-sm ">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </Group>

                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <p>
                      <FaEllipsisV />
                    </p>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => flagReview(review._id)}
                      leftSection={<FaFlag />}
                    >
                      Flag Review
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <p className="mt-2">{review.comment}</p>
            </Paper>
          ))}
        </div>

      </div>
    </Paper>
  );
};

export default CompanyDetail;
