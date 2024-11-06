import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  ScrollArea,
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
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import AdvertisementCard from "../shared/AdvertisementCard";
import EnquirySmall from "./EnquirySmall";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import SimilarStores from "./SimilarStores";
import Bookmark from "./Bookmark";
import AdminActions from "./AdminActions";
import { MdDelete } from "react-icons/md";

const CompanyDetail = () => {
  let { name } = useParams();
  const [company, setCompany] = React.useState(null);
  const [tabState, setTabState] = React.useState("contact");

  const [embla, setEmbla] = React.useState(null);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const isSelf = company?.admin?._id === user?._id;
  const isAdmin = user && user?.role === "admin";

  const [review, setReview] = React.useState({ rating: 0, comment: "" });

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
  }, []);

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
        throw new Error(data.message);
      }
      const data = await response.json();
      notifications.show({
        title: "Review submitted",
        message: data.message,
        color: "teal",
      });
      setCompany(JSON.parse(JSON.stringify(data.company)));
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

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("An error occurred while deleting review");
      }
      const data = await response.json();
      notifications.show({
        title: "Review Deleted",
        message: "Review has been successfully deleted",
      });
      window.location.reload();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full items-center px-4 p-6">
      <div className="carousel-container relative">
        <Carousel
          slideSize={{ base: "100%", sm: "50%", md: "50%" }}
          slideGap={{ base: "lg", sm: "md" }}
          align="start"
          withControls={false}
          getEmblaApi={setEmbla}
          loop
          className="w-full !rounded-lg"
        >
          {company.gallery.map((image, index) => (
            <img
              key={index}
              src={image?.url}
              alt={company?.name}
              className="object-cover aspect-video h-96 max-sm:h-60 border border-gray"
            />
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

      <div className="company-detail-container flex flex-col w-full px-12 max-lg:px-8 max-sm:px-4">
        <div className="title flex gap-4 items-center justify-start mt-6">
          <Avatar
            src={company?.logo.url}
            alt={company?.name}
            size="xl"
            className="border-2 border-black/70"
          />
          <div className="heading !my-2">{company?.name}</div>
          {company?.status === "pending" && (
            <Badge color="yellow" variant="filled">
              Pending
            </Badge>
          )}
          <Bookmark companyId={company._id} />
          {isAdmin && (
            <AdminActions company={company} setCompany={setCompany} />
          )}
          {isSelf && (
             <Link
             to={`/companies/${company?.name
               .split(" ")
               .join("-")}/enquiries`}
           >
             <Button color="primary.3">
               <IoChatbubbleEllipsesSharp className="mr-2" /> Enquiries
             </Button>
           </Link>
          )}
        </div>

        <div
          id="ratings"
          className="ratings flex flex-col items-start gap-2 my-4"
        >
          <div className="flex items-center gap-2">
            <Rating value={company?.rating} readOnly size="lg" />
            <div
              className="text-sm px-4 py-2 rounded-lg flex items-center font-semibold gap-1"
              style={{
                backgroundColor:
                  company.rating >= 4
                    ? "green"
                    : company.rating >= 2
                    ? "yellow"
                    : "red",
                color: "white",
              }}
            >
              <p>{company?.rating}</p>
              <FaStar />
            </div>
          </div>
          <div className="text-gray-600 flex items-center gap-2">
            <p>{company?.reviews?.length} review{company?.reviews?.length > 1 && 's'}{"."}</p>
          <div className="joined">
              <span className="text-xs italic text-gray-500">
                {'('}Joined on {new Date(company.createdAt).toLocaleDateString()}{')'}
              </span>
            </div>
          </div>
        </div>

        <div className="tabs w-full max-sm:text-xs flex">
          {["contact", "address", "description", "reviews"].map((item, idx) => {
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
          })}
        </div>

        <div
          id="address"
          className="address flex justify-start items-start flex-col"
        >
          <Link
            className="my-1 text-sm flex items-center gap-2 font-['inter']"
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
              className="text-xs"
            >
              <p className="website text-blue-800 hover:text-blue-900 transition-all duration-200 my-1">
                {company.website}
              </p>
            </Link>
            
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
                  title: company?.name,
                  text: `Check out ${company?.name}`,
                  url: window.location.href,
                });
              }}
              variant="filled"
              color="blue"
            >
              <FaShare className="mx-2" />
              Share
            </Button>
            {!isSelf && <Link
              to={`/companies/${company?.name
                .split(" ")
                .join("-")}/enquiries/add`}
            >
              <Button color="primary.3">
                <IoChatbubbleEllipsesSharp className="mr-2" /> Enquiry
              </Button>
            </Link>}
          </Group>
        </div>

        <div className="variable flex max-sm:flex-col justify-between w-full gap-2">
          <div className="left flex flex-col w-2/3 max-sm:w-full border rounded-lg p-4">
            <ScrollArea h={800} className="w-full">
              <div id="description">
                <div className="heading !my-4 pl-8 max-sm:pl-4 border-l-4 border-primary">
                  Description
                </div>
                <div
                  className="w-full max-sm:text-sm font-['inter'] leading-relaxed"
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
                    color="blue"
                    disabled={!review?.comment}
                    onClick={addReview}
                  >
                    Submit Review
                  </Button>
                </Group>
              </div>
            </ScrollArea>
          </div>

          <div className="right w-1/3 flex flex-col max-lg:w-[90%] max-sm:w-full px-4 gap-4">
            <AdvertisementCard />
            {isSelf ? <Link to="">View Enquiries</Link> : <EnquirySmall />}
          </div>
        </div>

        <div id="reviews" className="reviews">
          <div className="heading !my-4 pl-8 max-sm:pl-4 border-l-4 border-primary">
            Reviews
          </div>
          {company.reviews.slice(0, 10).map((review, index) => (
            <Paper
              key={index}
              withBorder
              className="p-4 mb-4 shadow-sm rounded-lg w-full"
            >
              <Group position="apart" justify="space-between">
                <Group>
                  <Avatar
                    src={review?.user?.profilePic}
                    alt={review?.user?.name}
                  />
                  <div>
                    <Title order={5}>{review?.user?.name}</Title>
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
                    {isAdmin && (
                      <Menu.Item
                        onClick={() => deleteReview(review._id)}
                        leftSection={<MdDelete />}
                      >
                        Delete Review
                      </Menu.Item>
                    )}
                  </Menu.Dropdown>
                </Menu>
              </Group>
              <p className="mt-2">{review.comment}</p>
            </Paper>
          ))}
          {company.reviews.length === 0 && (
            <p className="font-['inter']">No reviews found</p>
          )}
        </div>

        <div className="similar">
          <SimilarStores />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
