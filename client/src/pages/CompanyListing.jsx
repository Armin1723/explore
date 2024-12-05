import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { Stepper, Title, useMantineColorScheme } from "@mantine/core";
import { TiTick } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { MdDescription, MdPhoto } from "react-icons/md";
import ListingForm from "../components/company/ListingForm";
import DescriptionForm from "../components/company/DescriptionForm";
import GalleryForm from "../components/company/GalleryForm";
import { toggleRedirectFlag } from "../redux/features/redirectFlag/redirectFlagSlice";
import { Helmet } from "react-helmet-async";

const CompanyListing = () => {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme("light");
  }, []);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));

    if (!user || !user.name) {
      notifications.show({
        title: "Authentication Error",
        message: "You need to login to perform this action.",
        color: "red",
      });
      dispatch(toggleRedirectFlag());
      navigate("/auth/login");
    }
    if (user && user.company && user.company.status == "active") {
      notifications.show({
        title: "Already Listed",
        message: "You already have a listing.",
        color: "red",
      });
      navigate(`/companies/${user?.company?.name.split(" ").join("-")}`);
    }
    if (user && user.company) {
      if (user.company.gallery && user.company.gallery.length > 0) {
        setActive(3);
      } else if (user.company.description) {
        setActive(2);
      } else {
        setActive(1);
      }
    }
  }, [user]);
  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>List your Business | LinkIndia Portal</title>
        <meta
          name="description"
          content="LinkIndia Portal is a platform that helps you find the best businesses and services in your city. We provide a wide range of services including grocery, sports, electronics, fashion, books, and home essentials."
        />
        <meta
          name="keywords"
          content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
        />
        <meta name="author" content="LinkIndia Portal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="LinkIndia Portal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/companies/add`}
        />
      </Helmet>

      {/* Content */}
      <div className="flex flex-col min-h-screen w-screen items-center relative">
        <img
          src="/backgrounds/register-bg.svg"
          className="absolute bottom-0 left-0 min-h-[100dvh] w-full z-[-2] object-cover max-sm:aspect-[1/1.4]"
        />
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 mx-2 mb-20 max-lg:max-w-[80%] ">
          <div className="heading">List a company</div>
          <Stepper
            active={active}
            allowNextStepsSelect={false}
            completedIcon={<TiTick size={24} />}
            className="max-w-[80%] flex flex-col items-center"
          >
            <Stepper.Step
              label="First step"
              description="Add a Listing"
              icon={<FaList className="text-blue-400" />}
            >
              <ListingForm nextStep={nextStep} />
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              description="Describe your store."
              icon={<MdDescription className="text-blue-400" />}
            >
              <DescriptionForm nextStep={nextStep} />
            </Stepper.Step>
            <Stepper.Step
              label="Third step"
              description="Add photos"
              icon={<MdPhoto className="text-blue-400" />}
            >
              <GalleryForm nextStep={nextStep} />
            </Stepper.Step>
            <Stepper.Completed className="min-h-[40vh] w-[80vw] md:w-[30vw] flex flex-col items-center justify-start !my-[10vh] bg-white rounded-md">
              Completed, now await request approval or see how your
              <Link
                to={`/companies/${user?.company?.name.split(" ").join("-")}`}
                className="cursor-pointer text-blue-900 font-bold"
              >
                {" "}
                listing
              </Link>{" "}
              looks. A mail will be sent to you on {user.email} once your
              listing is approved.
            </Stepper.Completed>
          </Stepper>
        </div>
      </div>
    </>
  );
};

export default CompanyListing;
