import React from "react";
import { Header } from "../components/shared/Header";
import Lottie from "lottie-react";
import aboutUsGraphic from "../assets/about-us.json";
import { Accordion } from "@mantine/core";
import classes from "./AboutUs.module.css";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>About Us | Link India Portal</title>
        <meta
          name="description"
          content="Link India Portal is a platform that helps you find the best businesses and services in your city. We provide a wide range of services including grocery, sports, electronics, fashion, books, and home essentials."
        />
        <meta
          name="keywords"
          content="businesses, services, grocery, sports, electronics, fashion, books, home essentials"
        />

        <meta name="author" content="Link India Portal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="About Us | Link India Portal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/about-us`}
        />
      </Helmet>

      {/* Content */}
      <div className="w-screen flex flex-col items-center bg-secondary ">
        <Header />

        <div className="banner relative w-full overflow-hidden aspect-[16/3]">
          <img
            src="/backgrounds/about-bg.png"
            alt="About Us"
            className="w-full object-fit aspect-[16/3]"
          />
        </div>

        <div className="about-us-heading-container flex items-center w-4/5 max-lg:w-[90%] my-8 max-sm:my-4">
          <div className="about-us-content w-1/2 max-lg:w-full">
            <p className="heading !my-0 py-2 pl-6 border-l-4 border-primary">
              About Us
            </p>
            <p className="text max-lg:w-full py-4 leading-7 max-sm:leading-5 text-justify ">
              Link India Now is the best search engine platform serving you with
              everything that you need. We offer our clients a vast variety of
              search opportunities in all areas. Link India Now has a dedicated
              website for all android and iPhone users along with a toll free
              number (.......) so that you can connect with us without any
              hassle. Link India Now also provides you with sms services so that
              people are never out of touch with the updates. Link India Now
              offers you with smart services which are aimed at making user
              routine easier. We have curated features that take our platform
              from just being a search engine to a marketplace where our users
              are provided with all the solutions and even opportunities for
              transactions to happen within the application. <br/> For supporting the
              businesses, Link India Now has developed Link Omni, business
              management solution for SMEs. This management solution helps
              businesses go online, which results in increasing their online
              presence. In addition to this we have come up with Link Pay, its
              aim is to provide a strong protection to users and vendors while
              also guaranteeing a fast and secure payment process. The Social
              platform of Link India Now keeps our users updated with
              information. And to help our users bring their content to their
              targeted businesses, we also offer a real time chat messenger so
              that there's no delay in exchanging messages. At Link India Now
              our team’s attempt is to make local searches and business
              management as easy as possible for our users.
            </p>
          </div>
          <div className="graphic flex items-center justify-center w-1/2 max-sm:hidden">
            <Lottie animationData={aboutUsGraphic} loop={true} />
          </div>
        </div>

        <div className="our-mission-heading-container flex items-start justify-start w-4/5 max-lg:w-[90%] my-6 max-sm:my-4 gap-6">
          <div className="about-us-graphic max-sm:hidden w-2/5 px-8 h-full flex items-center justify-center">
            <img
              src="/about/graphic-1.png"
              alt="About Us"
              className="w-full h-full flex items-center justify-center object-cover"
            />
          </div>
          <div className="content flex-1">
            <p className="heading !my-0 py-2 pl-6 border-l-4 border-primary">
              Our Mission
            </p>
            <p className="text max-lg:w-full py-4 leading-7 max-sm:leading-5 text-justify ">
              At Link India Now our mission is to promote the development of a
              healthy business environment for local businesses. Our team
              believes that by making it easier for businesses to connect with
              customers and grow their online presence, we can create a thriving
              marketplace that will benefit everyone. Our aim is to provide
              every local business with the tools and platform that they need to
              succeed with. At Link India Now our vision is to become that
              platform which helps businesses reach new heights, providing them
              with the tools, resources and support that they need in today's
              digital era.
            </p>
          </div>
        </div>

        <div className="key-values flex flex-col w-4/5 max-lg:w-[90%] my-4">
          <div className="heading pl-6 border-l-4 border-primary mb-4">
            Key Highlights
          </div>
          <div className="flex py-2 pl-4">
            <p>
              <span className="font-bold">• Pan India presence: &nbsp;</span>
              Services offered all over India across 250+ cities.
            </p>
          </div>
          <div className="flex py-2 pl-4">
            <p>
              {" "}
              <span className="font-bold">
                • All In One Search Platform: &nbsp;
              </span>
              Search through a variety of businesses and services and discover
              amazing deals with just a click of a button
            </p>
          </div>
          <div className="py-2 pl-4">
            <p>
              <span className="font-bold">
                • Business Growth Solution: &nbsp;
              </span>
              We enhance your presence with our special chosen listing, and
              advertise your products and solutions
            </p>
          </div>
          <div className="flex py-2 pl-4">
            <p>
              <span className="font-bold">
                • User - Friendly Platform: &nbsp;
              </span>
              Enjoy convenience, suitable timelines, and efficiency that works
              in your favor to make the process as easy as possible when using
              the platform.
            </p>
          </div>
          <div className="flex py-2 pl-4">
            <p>
              <span className="font-bold">• Verified Listing : &nbsp;</span>
              Get Businesses and Services Provider information with a trusted
              verification process to ensure that you are making the right
              decision.
            </p>
          </div>
        </div>

        <div className="faq w-4/5 max-lg:w-[90%] px-4">
          <p className="heading pl-6 border-l-4 border-primary">
            Frequently Asked Questions.
          </p>
          <div className="faq-container flex max-lg:flex-col items-center my-6 gap-4 w-full px-6">
            <div className="faq-text flex flex-col items-start max-lg:items-center w-full justify-between gap-6">
              <div className="actual-faq text-sm w-full max-lg:text-center">
                <Accordion
                  chevronPosition="right"
                  defaultValue="reset-password"
                  variant="seperated"
                >
                  <Accordion.Item
                    className={classes.item}
                    value="reset-password"
                  >
                    <Accordion.Control>
                    What Services Does Link India Now Provide?
                    </Accordion.Control>
                    <Accordion.Panel>
                      Link India Now allows customers to search for providers
                      and services givers within the local market to get the
                      services they want. We offer a variety of services
                      starting from searching for qualified professionals up to
                      placing your services advertisement.
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item
                    className={classes.item}
                    value="another-account"
                  >
                    <Accordion.Control>
                      Is Link India Now only for Businessmen?
                    </Accordion.Control>
                    <Accordion.Panel>
                      Link India Now caters for both Businessmen and consumers.
                      Be it a service you are looking for or considering
                      advertising your business our website offers you with both
                      the solutions.
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item className={classes.item} value="add-business">
                    <Accordion.Control>
                      How can Businesses benefit from Link India Now?
                    </Accordion.Control>
                    <Accordion.Panel>
                      Our site provides access to verified listings where
                      businesses can get the visibility they need to reach
                      targeted customers and promote their services using our
                      platform.
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item
                    className={classes.item}
                    value="advertise-business"
                  >
                    <Accordion.Control>
                      Does Link India Now offer free services ?
                    </Accordion.Control>
                    <Accordion.Panel>
                      Yes, the use of our platform is free for the users to
                      interact with. However, we also have premium services that
                      you have to pay for. Those companies who are interested in
                      utilizing additional options for increasing their
                      visibility.
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item className={classes.item} value="upload-file">
                    <Accordion.Control>
                      How can i get in contact?
                    </Accordion.Control>
                    <Accordion.Panel>
                      You can connect with us through the customer support by
                      email, chat, or phone, any time from our website
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* <ContactCard /> */}

        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
