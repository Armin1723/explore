import React from "react";
import { Header } from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>Privacy Policy | LinkIndia Portal</title>
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
        <meta property="og:title" content="Privacy Policy | LinkIndia Portal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/privacy-policy`}
        />
      </Helmet>

      {/* Content */}
      <div className="w-screen flex flex-col items-center bg-secondary">
        <Header />

        <div className="banner relative w-full overflow-hidden aspect-[16/3]">
          <img
            src="/backgrounds/testimonials-bg.webp"
            alt="About Us"
            className="w-full object-fit aspect-[16/3]"
          />
          <div className="overlay !my-0 bg-black/10 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="heading !my-0 !text-3xl !max-lg:text-2xl !max-sm:text-xl text-white">
              {" "}
              Privacy Policy
            </p>
          </div>
        </div>

        <div className="content-container flex flex-col w-full px-[10%] max-lg:px-[5%] max-sm:px-6 py-6 text-justify">
          <p className="heading !my-2 pl-12 max-lg:pl-6 border-l-4 border-primary w-full text-left">
            Privacy Policy
          </p>
          <p className="">
            The Privacy Policy of www.indiamart.com (hereinafter referred to as
            “site ") detailed herein below governs the collection, possession,
            storage, handling and dealing of personal identifiable
            information/data and sensitive personal data (hereinafter
            collectively referred to as “information”) of the users of the site.
            All the users must read and understand this Privacy Policy as it has
            been formulated to safeguard the user’s privacy. This Privacy Policy
            also outlines the ways the users can ensure protection of their
            personal identifiable information. You must accept the contents of
            this Policy in order to use or continue using our site. This Privacy
            Policy detailed herein is also applicable to user of the site or
            mobile application through mobile or any other similar device
          </p>
          <p className="my-2 font-semibold uppercase">
            COLLECTION OF INFORMATION
          </p>
          <div className="w-full">
            We confirm that we collect those information from you which is
            required to extend the services available on the site.
            <ul className="list-disc list-inside text-justify md:w-3/4 pl-4">
              <li>
                At the time of signing up and registration with the site, we
                collect user information including name, company name, email
                address, phone/mobile number, postal address and other business
                information which may also include business statutory details
                and tax registration numbers.{" "}
              </li>
              <li>
                In this regard, we may also record conversations and archive
                correspondence between users and the representatives of the site
                (including the additional information, if any) in relation to
                the services for quality control or training purposes.
              </li>
              <li>
                {" "}
                In relation to our paid services, we may collect personal
                information of a more sensitive nature which includes bank
                account numbers and related details to facilitate the sale or
                purchase of the services available on the site.{" "}
              </li>
              <li>
                We also gathers and stores the user’s usage statistics such as
                IP addresses, pages viewed, user behaviour pattern, number of
                sessions and unique visitors, browsing activities, browser
                software operating system etc. for analysis, which helps us to
                provide improved experience and value added services to you.{" "}
              </li>
              <li>
                Once a user registers, the user is no longer anonymous to us and
                thus all the information provided by you shall be stored,
                possessed in order to provide you with the requested services
                and as may be required for compliance with statutory
                requirements.{" "}
              </li>
              <li>
                User’s registration with us and providing information is
                intended for facilitating the users in its business. We retains
                user provided Information for as long as the Information is
                required for the purpose of providing services to you or where
                the same is required for any purpose for which the Information
                can be lawfully processed or retained as required under any
                statutory enactments or applicable laws.{" "}
              </li>
              <li>
                In relation to provide additional services to our users we also
                let service providers, payment systems and data aggregators to
                collect or store your information specially to verify credit
                analysis and credit limits from time to time.
              </li>
              <li>
                These data points may be captured by regulated financial
                entities through secure integration from your desktop, mobile
                and other such devices by analyzing transactional SMS, installed
                app details, queries, device location, device information, IMEI
                number, serial number, MNC and MCC codes, RAM storage, WIFI
                information etc. We also avail of the class called
                AccountManager from the Google SDK which allows us to fetch
                social account related details.{" "}
              </li>
              <li>
                However, we only collect Your e-mail IDs that you may be logged
                into from the device that you are accessing our platform from.
                This allows us to pre-fill Your verified e-mail ID details so
                that we can offer You a seamless and convenient user experience.
                You can always edit such pre-filled e-mail ID from your user
                profile.{" "}
              </li>
            </ul>
            User may update, correct, or confirm provided information by logging
            on to their accounts on the site or by sending a request to
            customercare@indiamart.com. The requested changes may take
            reasonable time due to verification process and server cache
            policies. In case you would like to receive a copy of our
            information held by us for porting to another service, please
            contact us with your request at the email address above. Users may
            also choose to delete or deactivate their accounts on the site. We
            will evaluate such requests on a case-to-case basis and take the
            requisite action as per applicable law. In this regard, please note
            that information sought to be deleted may remain with us in archival
            records for the purpose of compliance of statutory enactments, or
            for any other lawful purpose. Therefore, users are requested to
            carefully evaluate what types of information they would like to
            provide to us at the time of registration.
          </div>

          <p className="my-2 font-semibold uppercase">Cookies</p>
          <div className="w-full">
            We, and third parties with whom we partner, may use cookies, pixel
            tags, web beacons, mobile device IDs, “flash cookies” and similar
            files or technologies to collect and store information in respect to
            your use of the site and track your visits to third party websites.
            We also use cookies to recognize your browser software and to
            provide features such as recommendations and personalization. Third
            parties whose products or services are accessible or advertised
            through the site, including social media sites, may also use cookies
            or similar tools, and we advise you to check their privacy policies
            for information about their cookies and the practices followed by
            them. We do not control the practices of third parties and their
            privacy policies govern their interactions with you.
          </div>

          <p className="my-2 font-semibold uppercase">
            DATA COLLECTION RELATING TO CHILDREN
          </p>
          <div className="w-full">
            We strongly believe in protecting the privacy of children. In line
            with this belief, we do not knowingly collect or maintain Personally
            Identifiable Information on our Site from persons under 18 years of
            age, and no part of our Site is directed to persons under 18 years
            of age. If you are under 18 years of age, then please do not use or
            access our services at any time or in any manner. We will take
            appropriate steps to delete any Personally Identifiable Information
            of persons less than 18 years of age that has been collected on our
            Site without verified parental consent upon learning of the
            existence of such Personally Identifiable Information. If we become
            aware that a person submitting personal information is under 18, we
            will delete the account and all related information as soon as
            possible. . If you believe we might have any information from or
            about a child under 18 please contact us at
            customercare@indiamart.com
          </div>

          <p className="my-2 font-semibold uppercase">DATA Transfers</p>
          <div className="w-full">
            User Information that we collect may be transferred to, and stored
            at, any of our affiliates, partners or service providers which may
            be inside or outside the country you reside in. By submitting your
            personal data, you agree to such transfers. Your Personal
            Information may be transferred to countries that do not have the
            same data protection laws as the country in which you initially
            provided the information. When we transfer or disclose your Personal
            Information to other countries, we will protect that information as
            described in this Privacy Policy. relevant, we will ensure
            appropriate contractual safeguards to ensure that your information
            is processed with the highest standards of transparency and
            fairness.
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
