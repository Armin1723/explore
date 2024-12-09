import React from "react";
import { Header } from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>Privacy Policy | Link India Portal</title>
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
        <meta
          property="og:title"
          content="Privacy Policy | Link India Portal"
        />
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
            Link India Now takes your privacy very seriously. This Privacy
            Policy sets out how we obtain, utilize, release and safeguard your
            personal information when you access and use our Site, or any other
            services. User also permits the company to employ Cookies by
            continued use of our Services in agreement with the policy stated
            here.
          </p>

          <ul className="lists list-decimal list-inside ">
            <li className="my-2 font-semibold uppercase text-lg">
              Information We Collect :
            </li>
            <p>
              We may collect the following types of information when you use our
              Services:
            </p>
            <ul className="list-decimal list-inside pl-12 max-lg:pl-6 my-2">
              <li>
                <span className="font-semibold">Personal Information: </span>
                Date of signing up, the username, email, phone number, date of
                birth, location among other details input in the course of
                registering or using the site.
              </li>
              <li>
                <span className="font-semibold">Technical Information: </span>
                This information includes the IP address, the browser used, the
                operating system used and the pattern while browsing the
                internet.
              </li>
              <li>
                <span className="font-semibold">Usage Data: </span>
                Details about how you engage with our website; our application
                and services that we provide.
              </li>
            </ul>

            <li className="my-2 font-semibold uppercase text-lg">
              How We Use Your Information :
            </li>
            <p>We use your information for the following use:</p>
            <ul className="list-decimal list-inside pl-12 max-lg:pl-6">
              <li>
                For making our Services available, maintaining and enhancing
                them.
              </li>
              <li>To allow customization.</li>
              <li>
                For purposes of conducting our transactions and attending to
                your order specifics.
              </li>
              <li>
                For notifying certain changes,or other relevant information with
                your permission.For notifying certain changes,or other relevant
                information with your permission.
              </li>
              <li>
                The other reason for the necessity of stakeholder engagement is
                to meet the legal requirements of the company.
              </li>
            </ul>

            <li className="my-2 font-semibold uppercase text-lg">
              Sharing Your Information :
            </li>
            <p>
              Your information is not shared with any third party and is not
              sold. However, it may be shared under the following circumstances:
            </p>
            <ul className="list-decimal list-inside pl-12 max-lg:pl-6">
              <li>
                We might share it, With any advertisers, partners, or affiliates
                to complete your request.
              </li>
              <li>Where the law or group of regulation demands for it.</li>
              <li>All With your explicit consent.</li>
            </ul>

            <li className="my-2 font-semibold uppercase text-lg">
              Data Security :
            </li>
            <p>
              We use electronic, and managerial procedures that help to
              safeguard the data you supply to us from improper disclosure or
              use.
            </p>

            <li className="my-2 font-semibold uppercase text-lg">
              Your Rights :
            </li>
            <p>
            You have the right to:
            </p>
            <ul className="list-decimal list-inside pl-12 max-lg:pl-6">
              <li>
              Correction, view or delete your personal information.
              </li>
              <li>To opt-out of marketing communication..</li>
              <li> Submit for withdrawal of consent for data processing wherever deemed necessary</li>
            </ul>

            <li className="my-2 font-semibold uppercase text-lg">
              Cookies technology Used :
            </li>
            <p>
              We employ cookies to improve your experience when using the
              website. Further use of the website means that you accept the use
              of cookies. You can control the cookies used for your browser
              through your browser settings.
            </p>

            <li className="my-2 font-semibold uppercase text-lg">
              Third-Party Links :
            </li>
            <p>
              Links to third-party websites may be provided from our website. We
              do not control the web sites linked to and therefore have no
              control over their privacy policies.
            </p>

            <li className="my-2 font-semibold uppercase text-lg">
              Children’s Privacy :
            </li>
            <p>
              Our Services do not target users who are below the age of 13. As a
              general policy no information is knowingly collected from children
              under the age of eighteen and no child should disclose information
              on this website.
            </p>

            <li className="my-2 font-semibold uppercase text-lg">
              Changes to This Policy :
            </li>
            <p>
              We may occasionally expand or refine this policy as needed. Major
              shifts to or from any particular practice will be conveyed either
              in an email message or by an announcement on the homepage of our
              website.
            </p>

            <li className="my-2 font-semibold uppercase text-lg">
              Contact Us :
            </li>
            <p>
              If you have questions, concerns, or feedback about this policy, please contact us:
              <ul className="list-disc list-inside pl-4 my-2">
                <li>Email: </li>
                <li>Phone: </li>
              </ul>
            </p>
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
