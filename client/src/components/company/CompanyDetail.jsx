import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Paper, Title, Avatar, Group, Rating } from "@mantine/core";

import { FaPhone, FaWhatsapp, FaEnvelope, FaShare } from "react-icons/fa";
import { Button } from "@mantine/core";

const CompanyDetail = () => {
  let { name } = useParams();
  const [company, setCompany] = React.useState(null);

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

  if (!company) return <div>Loading...</div>;


  return (
    <Paper className="flex flex-col flex-1 w-4/5 max-sm:w-full max-sm:px-4 my-8 p-6 shadow-lg rounded-lg">
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
            className="object-cover aspect-video h-96 rounded-lg"
          />
        ))}
      </Carousel>
      <div className="flex gap-4 items-center justify-start my-6">
        <Avatar src={company.logo.url} alt={company.name} size="xl" />
        <Title my="md" fz="xl" fw="500" className="flex-1">
          {company.name}
        </Title>
      </div>

      <div className="ratings flex items-center gap-2 my-4">
        <Group>
          <Rating value={company.rating} readOnly size="lg" />
        </Group>
        <span className="text-3xl font-bold">{company.rating}</span>
        <span className="text-md text-gray-600">
          {company.reviews.length} reviews{" "}
        </span>
      </div>

      <div className="contact my-4">
        <Group position="apart">
          <Button
            component="a"
            href={`tel:${company.phone.number}`}
            leftIcon={<FaPhone />}
            variant="outline"
            color="blue"
          >
            Call: {company.phone.number}
          </Button>
          <Button
            component="a"
            href={`https://wa.me/${company.phone.number}`}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<FaWhatsapp />}
            variant="outline"
            color="green"
          >
            WhatsApp
          </Button>
          <Button
            component="a"
            href={`mailto:${company.email}`}
            leftIcon={<FaEnvelope />}
            variant="outline"
            color="red"
          >
            Email: {company.email}
          </Button>
          <Button
            onClick={() => {
              navigator.share({
                title: company.name,
                text: `Check out ${company.name}`,
                url: window.location.href,
              });
            }}
            leftIcon={<FaShare />}
            variant="outline"
            color="blue"
          >
            Share
          </Button>
        </Group>
      </div>

      <div
        className="w-full md:w-[70vw] text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: company.description }}
      ></div>
    </Paper>
  );
};

export default CompanyDetail;
