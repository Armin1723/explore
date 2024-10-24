import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/shared/Header";
import { Stepper, Title } from "@mantine/core";
import { TiTick } from "react-icons/ti";
import { FaList } from "react-icons/fa";
import { MdDescription, MdPhoto } from "react-icons/md";
import ListingForm from "../components/company/ListingForm";
import DescriptionForm from "../components/company/DescriptionForm";
import GalleryForm from "../components/company/GalleryForm";

const CompanyListing = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
      navigate("/auth/login");
    }
    if (user && user.company && user.company.status=='active') {
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
    <div className="flex flex-col h-screen w-screen ">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 mx-2 mb-20">
        <Title className="my-4">List a company</Title>
        <Stepper
          active={active}
          allowNextStepsSelect={false}
          completedIcon={<TiTick size={24} />}
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
          <Stepper.Completed className="min-h-[40vh] w-[80vw] md:w-[30vw] flex flex-col items-center justify-start !my-[10vh]">
            Completed, now await request approval or see how your 
            <Link to={`/companies/${user?.company?.name.split(" ").join("-")}`} className="cursor-pointer text-blue-600"> listing</Link> looks.
            A mail will be sent to you on {user.email} once your listing is approved.
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
  );
};

export default CompanyListing;
