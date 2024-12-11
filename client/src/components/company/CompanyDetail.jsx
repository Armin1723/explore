import { notifications } from "@mantine/notifications";
import React, { Suspense, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Group,
  Rating,
  Badge,
  Textarea,
  ScrollArea,
  Modal,
} from "@mantine/core";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaShare,
  FaMapMarkerAlt,
  FaStar,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import AdvertisementCard from "../shared/AdvertisementCard";
import EnquirySmall from "./EnquirySmall";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import SimilarStores from "./SimilarStores";
import Bookmark from "./Bookmark";
import AdminActions from "./AdminActions";
import CompanyReviews from "./CompanyReviews";
import { useDisclosure } from "@mantine/hooks";
import AuthModal from "../shared/AuthModal";
import { Helmet } from "react-helmet-async";
import striptags from "striptags";

const CompanyDetail = () => {
  let { name } = useParams();
  const [company, setCompany] = React.useState(null);

  const [embla, setEmbla] = React.useState(null);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const isSelf = company?.admin?._id === user?._id || false;
  const isAdmin = user && user?.role === "admin";

  const [review, setReview] = React.useState({ rating: 0, comment: "" });

  const [tabState, setTabState] = useState("contact");

  const [opened, { open, close }] = useDisclosure(false);

  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("reviewId");

  // UseEffect to handle scroll tracking
  useEffect(() => {
    const sections = ["contact", "description", "reviews", "similars"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTabState(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/company/name/${name}?isAdmin=${isAdmin}`,
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
        navigate("/");
      }
    };
    fetchCompany();

    //fetch review in case of redirect
    if (reviewId) {
      const fetchReview = async () => {
        // try {
        //   const response = await fetch(
        //     `${
        //       import.meta.env.VITE_BACKEND_URL
        //     }/api/company/review/${reviewId}`,
        //     {
        //       method: "GET",
        //       credentials: "include",
        //     }
        //   );
        //   if (!response.ok) {
        //     const data = await response.json();
        //     throw new Error(data.message);
        //   }
        //   const data = await response.json();
        //   setCompany((prev) => {
        //     return {
        //       ...prev,
        //       reviews: [data.review],
        //     };
        //   });
        // } catch (error) {
        //   console.log(error.message);
        // }
      };
      fetchReview();
    }
  }, [name]);

  if (!company)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );

  const addReview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/review/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ review, companyName: company?.name }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        if (response.status == 401) {
          open();
          throw new Error("Kindly Login");
        } else {
          setReview({ rating: 0, comment: "" });
          throw new Error(data.message);
        }
      }
      const data = await response.json();
      notifications.show({
        title: "Review submitted",
        message: data.message,
        color: "teal",
      });
      setCompany(JSON.parse(JSON.stringify(data.company)));
      setReview({ rating: 0, comment: "" });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${company?.name} - Link India Portal`}</title>
        <meta
          name="description"
          content={`Learn more about ${company?.name}. ${striptags(
            company?.description
          )}.`}
        />
        <meta
          name="keywords"
          content={`${company?.name}, ${company?.category}, ${(company?.subCategory)[0]}`}
        />
        <meta property="og:title" content={company?.name} />
        <meta
          property="og:description"
          content={`Link India services and reviews for ${company?.name}.`}
        />
        <meta property="og:image" content={company?.logo?.url} />
        <meta
          property="og:url"
          content={`${
            import.meta.env.VITE_FRONTEND_URL
          }/companies/${company?.name.split(" ").join("-")}`}
        />
      </Helmet>

      <div className="flex flex-col flex-1 w-full items-center px-4 p-6">
        <div className="carousel-container relative w-full" id="contact">
          <Carousel
            slideSize={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }}
            slideGap={0}
            align="start"
            withControls={false}
            getEmblaApi={setEmbla}
            loop
            className=""
          >
            {company.gallery.map((image, index) => (
              <Carousel.Slide key={index}>
                <Suspense
                  fallback={
                    <div className="object-cover aspect-video w-full border bg-gray-600 animate-pulse"></div>
                  }
                >
                  <img
                    src={image?.url?.replace(
                      "/upload/",
                      "/upload/w_1080/h_720/c_fill/"
                    )}
                    alt={company?.name}
                    className="object-cover aspect-video w-full border border-gray"
                  />
                </Suspense>
              </Carousel.Slide>
            ))}
          </Carousel>
          <div className="absolute controls flex justify-between w-full top-1/2 left-0 -translate-y-1/2">
            <div
              className="prev cursor-pointer bg-white/40 hover:bg-white/60 transition-all duration-200 p-2 rounded-e-lg"
              onClick={() => embla && embla.scrollPrev()}
            >
              <FaChevronCircleLeft />
            </div>
            <div
              className="next cursor-pointer bg-white/40 hover:bg-white/60 transition-all duration-200 p-2 rounded-s-lg"
              onClick={() => embla && embla.scrollNext()}
            >
              <FaChevronCircleRight />
            </div>
          </div>
        </div>

        <div className="company-detail-container flex flex-col w-full px-12 max-lg:px-8 max-sm:px-2">
          <div className="title flex flex-wrap items-center justify-between mt-6">
            <div className="title-left flex items-center flex-wrap gap-4">
              <Avatar
                src={company?.logo.url}
                alt={company?.name}
                size="xl"
                className="border-2 border-black/70"
              />
              <div className="heading !my-2 font-medium">{company?.name}</div>
              {company?.status === "pending" && (
                <Badge color="yellow" variant="filled">
                  Pending
                </Badge>
              )}
              <Bookmark companyId={company._id} />{" "}
              <div
                onClick={() => {
                  navigator.share({
                    title: company?.name,
                    text: `Check out ${company?.name}`,
                    url: window.location.href,
                  });
                }}
                className="cursor-pointer"
              >
                <FaShare />
              </div>
              {user && user?.name && isSelf && (
                <Link
                  to={`/companies/${company?.name
                    .split(" ")
                    .join("-")}/enquiries`}
                  className="relative"
                >
                  <IoChatbubbleEllipsesSharp className="mr-2 text-brand/75 hover:text-brand transition-al duration-300 text-xl" />
                  <div className="indicator absolute text-xs top-0 right-0 -translate-y-1/2 -translate-x-1/2 font-semibold">
                    {
                      company?.enquiries?.filter(
                        (enquiry) => enquiry.status === "pending"
                      ).length
                    }
                  </div>
                </Link>
              )}
            </div>

            {isAdmin && (
              <AdminActions company={company} setCompany={setCompany} />
            )}
          </div>

          <div
            id="ratings"
            className="ratings flex flex-col items-start gap-2 my-4"
          >
            <div className="flex items-center gap-2">
              <Rating
                value={company?.rating}
                fractions={4}
                readOnly
                size="lg"
              />
              <div
                className="px-4 py-1 rounded-lg flex items-center font-semibold text-sm gap-1"
                style={{
                  backgroundColor:
                    company.rating >= 4
                      ? "green"
                      : company.rating >= 3.5
                      ? "yellowgreen"
                      : company.rating >= 2.5
                      ? "orange"
                      : "red",
                  color: "aliceblue",
                }}
              >
                <p>{company?.rating.toFixed(1)}</p>
                <FaStar />
              </div>
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              <p>
                {company?.reviews?.length} review
                {company?.reviews?.length > 1 && "s"}
                {"."}
              </p>
              <div className="joined">
                <span className="text-xs italic text-gray-500">
                  {"("}Listed Since:{" "}
                  {new Date(company.createdAt).toLocaleDateString()}
                  {")"}
                </span>
              </div>
            </div>
          </div>

          <div className="tabs w-full max-sm:text-xs flex ">
            {["contact", "description", "reviews", "similars"].map(
              (item, idx) => (
                <div
                  key={idx}
                  className={`px-4 my-2 py-1 cursor-pointer rounded-lg ${
                    item === tabState &&
                    "border-b-4 border border-primary-500/20 border-b-primary font-semibold"
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
              )
            )}
          </div>

          <div
            id="address"
            className="address flex justify-start items-start flex-col"
          >
            <Link
              className="my-1 text-sm flex items-center gap-2 "
              target="blank"
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                company?.address
              )}`}
            >
              <FaMapMarkerAlt />
              {company.address}
            </Link>
            <Link
              to={`${
                company?.website.includes("https")
                  ? company?.website
                  : `https://${company.website}`
              } `}
              target="blank"
              className="text-sm"
            >
              <p className="website text-blue-800 hover:text-blue-900 transition-all duration-200 my-1">
                {company.website}
              </p>
            </Link>
          </div>

          <div id="contact" className="contact my-4 max-sm:my-1">
            <div className="flex flex-wrap gap-2">
              <Button
                component="a"
                href={`tel:${company.phone.number}`}
                color="green.9"
                className="text-[#155515] hover:text-[darkGreen] rounded-full flex gap-2 items-center justify-center px-1 "
              >
                <FaPhoneAlt className="mx-2" />
                {company.phone.number}
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
            </div>
          </div>

          <div className="variable flex max-lg:flex-col justify-between w-full gap-2">
            <div className="left flex flex-col w-2/3 max-lg:w-full border rounded-lg p-4 max-sm:p-2 ">
              <ScrollArea
                offsetScrollbars
                scrollbarSize={6}
                scrollHideDelay={500}
                h={800}
                className="w-full"
              >
                <div id="description" className="">
                  <div className="heading !my-4 pl-8 max-sm:pl-4 border-l-4 border-primary">
                    Description
                  </div>
                  <div
                    className="w-full max-sm:text-sm leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: company.description }}
                  ></div>
                </div>

                <div className="add-review my-8">
                  <div className="heading !my-4 pl-8 max-sm:pl-4 border-l-4 border-primary">
                    Add Your Review
                  </div>
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
                    <Button
                      variant="filled"
                      color="brand.5"
                      disabled={!review?.comment}
                      onClick={addReview}
                    >
                      Submit Review
                    </Button>
                  </Group>
                </div>
              </ScrollArea>
            </div>

            <div className="right w-1/3 flex flex-col max-lg:w-full px-4 max-sm:px-0 gap-4">
              <AdvertisementCard />
              {isSelf ? (
                <Link
                  to="enquiries"
                  className="w-full flex items-center gap-4 justify-start min-h-[10vh] rounded-md border p-4 relative hover:opacity-90"
                >
                  <p className="sub-heading !my-0">View Your Enquiries.</p>
                  <IoIosTrendingUp className="" />
                </Link>
              ) : (
                <EnquirySmall />
              )}
            </div>
          </div>

          <CompanyReviews
            company={company}
            setCompany={setCompany}
            isAdmin={isAdmin}
          />

          <div className="similar" id="similars">
            <SimilarStores />
          </div>
        </div>

        {/* Auth Modal */}
        <Modal opened={opened} onClose={close} size="auto" centered>
          <AuthModal close={close} />
        </Modal>
      </div>
    </>
  );
};

export default CompanyDetail;
