import React from "react";
import { Header } from "../components/shared/Header";
import Lottie from "lottie-react";
import aboutUsGraphic from "../assets/about-us.json";
import { Accordion } from "@mantine/core";
import classes from "./AboutUs.module.css";
import Footer from "../components/shared/Footer";
import ContactCard from "../components/home/ContactCard";

const AboutUs = () => {
  return (
    <div className="w-screen flex flex-col items-center mt-[10vh] bg-secondary font-['Inter']">
      <Header />

      <div className="banner relative w-full overflow-hidden aspect-[16/3]">
        <img
          src="/backgrounds/about-bg.webp"
          alt="About Us"
          className="w-full object-fit aspect-[16/3]"
        />
        <div className="overlay !my-0 bg-black/10 absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <p className="heading !my-0 !text-3xl !max-lg:text-2xl !max-sm:text-xl text-white">
            {" "}
            About Us
          </p>
        </div>
      </div>

      <div className="about-us-heading-container flex items-start max-lg:items-center w-4/5 max-lg:w-[90%] my-8 max-sm:my-4">
        <div className="about-us-content w-2/3 max-lg:w-full">
          <p className="heading !my-0 py-2 pl-6 border-l-4 border-primary">
            About Us
          </p>
          <p className="text w-3/4 max-lg:w-full py-4 font-['inter'] leading-7 max-sm:leading-5 text-justify ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt nobis
            inventore reprehenderit tenetur necessitatibus distinctio ea quod
            exercitationem. A deleniti molestias eaque tempora nostrum
            voluptates ipsam sunt hic nisi, non, optio reprehenderit nam vero
            laudantium ullam eum ipsum? Hic odio amet deleniti, optio aliquam
            officiis reprehenderit accusantium saepe! At magni totam, voluptatem
            facilis deleniti optio! Totam deserunt quos debitis voluptatum!
            Saepe nobis quia veniam officiis velit iure repudiandae ratione id,
            dolore debitis voluptas, porro, voluptatem ut consequuntur ab a.
            Explicabo dignissimos odio consequatur ipsum accusamus minus, nobis
            sapiente eum omnis velit tempora praesentium, optio voluptatibus
            necessitatibus reiciendis! Reprehenderit laborum veniam odit
            distinctio esse possimus consequuntur aperiam, suscipit delectus
            eius dolorem, nam necessitatibus corporis. Voluptatum ab perferendis
            velit, quibusdam culpa atque corrupti qui consequuntur dolor eaque,
            nam, quisquam maiores aspernatur quaerat repellat ut in incidunt et
            est obcaecati exercitationem possimus? Delectus corrupti distinctio
            totam saepe adipisci voluptates quis voluptas nostrum vero!
          </p>
        </div>
        <div className="about-us-graphic max-sm:hidden w-1/3">
          <Lottie animationData={aboutUsGraphic} loop={true} />
        </div>
      </div>

      <div className="our-mission-heading-container flex items-start justify-end w-4/5 max-lg:w-[90%] my-8 max-sm:my-4">
        <div className="graphic flex items-center justify-center w-full h-full max-lg:w-1/2 max-sm:hidden">
          <Lottie animationData={aboutUsGraphic} loop={true} />
        </div>
        <div className="content w-1/2 max-lg:w-full">
          <p className="heading !my-0 py-2 pl-6 border-l-4 border-primary">
            Our Mission
          </p>
          <p className="text w-3/4 max-lg:w-full py-4 font-['inter'] leading-7 max-sm:leading-5 text-justify ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            enim facere doloribus sapiente corrupti quibusdam porro modi
            voluptatum nam illo amet neque perspiciatis vel odio at, sint
            necessitatibus sit labore commodi omnis? Quia, facere perspiciatis
            cumque iusto ullam natus eaque libero maxime, accusantium
            repellendus laborum! Voluptas eligendi facilis laudantium odit?
          </p>
        </div>
      </div>

      <div className="key-values flex flex-col  w-[70%] max-lg:w-[80%] max-sm:w-[90%] my-4">
        <div className="heading pl-6 border-l-4 border-primary mb-4">
          Key Highlights
        </div>
        <div className="flex py-2">
          <p>
            <span className="font-bold">• Pan India presence: &nbsp;</span>
            Services offered all over India across 250+ cities.
          </p>
        </div>
        <div className="flex py-2">
          <p>
            {" "}
            <span className="font-bold">• First-mover advantage: &nbsp;</span>
            Being the industry pioneer, Justdial has a robust presence in all
            cities and towns of India including deep penetration in Tier II and
            III cities.
          </p>
        </div>
        <div className="py-2">
          <p>
            <span className="font-bold">
              • Advanced and scalable technology platform: &nbsp;
            </span>
            A vast range of features for a more engaging user experience with 23
            transaction oriented search plus verticals, JD Social – Justdial's
            own social sharing platform, and a Real Time Chat Messenger, on a
            single platform.
          </p>
        </div>
        <div className="flex py-2">
          <p>
            <span className="font-bold">
              • Advanced and scalable technology platform: &nbsp;
            </span>
            A vast range of features for a more engaging user experience with 23
            transaction oriented search plus verticals, JD Social – Justdial's
            own social sharing platform, and a Real Time Chat Messenger, on a
            single platform.
          </p>
        </div>
      </div>

      <div className="faq w-3/4 max-lg:w-full max-lg:px-6 px-4">
        <p className="heading pl-6 border-l-4 border-primary">Frequently Asked Questions.</p>
        <div className="faq-container flex max-lg:flex-col items-center my-6 gap-4 w-full">
          <div className="faq-text flex flex-col items-start max-lg:items-center w-full justify-between gap-6">
            <div className="actual-faq text-sm w-full max-lg:text-center">
              <Accordion
                chevronPosition="right"
                defaultValue="reset-password"
                variant="separated"
              >
                <Accordion.Item className={classes.item} value="reset-password">
                  <Accordion.Control>
                    How can I reset my password?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Go to forget password section on your login page and enter
                    you email Id, you will recieve a link on your mail to reset
                    your password.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="another-account"
                >
                  <Accordion.Control>
                    Can I create more that one account?
                  </Accordion.Control>
                  <Accordion.Panel>
                    You can create as many accounts as you have email.However,
                    you can only create one listing with each account.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="add-business">
                  <Accordion.Control>
                    How can I add my business to the platform?
                  </Accordion.Control>
                  <Accordion.Panel>
                    To add your business, click on the "Add Business" button
                    located on the homepage. Fill in the required details about
                    your business and submit it for approval. Once approved,
                    your business will be listed on the platform.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="advertise-business"
                >
                  <Accordion.Control>
                    How can I advertise my business?
                  </Accordion.Control>
                  <Accordion.Panel>
                    To advertise your business, go to the "Advertise" section
                    after logging in. Choose a package, customize your
                    advertisement, and submit it. Our team will review and
                    approve your advertisement.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className={classes.item} value="upload-file">
                  <Accordion.Control>
                    Why can't I upload files for my business listing?
                  </Accordion.Control>
                  <Accordion.Panel>
                    If you're facing issues uploading files, please make sure
                    the file size is within the limit and the file type is
                    supported. If the problem persists, try using another
                    browser or contact support.
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item
                  className={classes.item}
                  value="category-selection"
                >
                  <Accordion.Control>
                    How do I select a category for my business?
                  </Accordion.Control>
                  <Accordion.Panel>
                    During the business registration process, you will be
                    prompted to select a category. You can choose from
                    categories like grocery, food, electronics, fashion, books,
                    and home. This will help users find your business easily.
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
  );
};

export default AboutUs;
