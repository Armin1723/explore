import React from "react";
import { Header } from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>Terms and Conditions | Link India Portal</title>
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
          content="Terms and COnditions | Link India Portal"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/terms-and-conditions`}
        />
      </Helmet>

      {/* Content */}
      <div className="w-screen flex flex-col items-center bg-secondary ">
        <Header />
        <div className="banner relative w-full overflow-hidden aspect-[16/3]">
          <img
            src="/backgrounds/testimonials-bg.webp"
            alt="Terms and Conditions"
            className="w-full object-fit aspect-[16/3]"
          />
          <div className="overlay !my-0 bg-black/10 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="heading !my-0 !text-3xl !max-lg:text-2xl !max-sm:text-xl text-white">
              {" "}
              Terms and Conditions.
            </p>
          </div>
        </div>

        <ul className="content-container list list-decimal list-inside flex flex-col w-full px-[10%] max-lg:px-[5%] max-sm:px-6 py-6 text-justify">
          <p className="heading !my-2 pl-12 max-lg:pl-6 border-l-4 border-primary w-full text-left">
            Terms of Use
          </p>
          <p className="">
            Welcome to Link India Now, these terms and conditions govern your
            use of our website, and any other services provided by Link India
            Now. By accessing or using our services, you agree to comply with
            and be bound by these terms. If you do not agree to these terms,
            please refrain from using our Services.
          </p>
          <li className="my-2 font-semibold uppercase text-lg">
            Definitions :
          </li>
          <div className="w-full">
            <div className="item">
              <span className="font-semibold">Company :</span> Refers to Link
              India Now.
            </div>
            <div className="item">
              <span className="font-semibold">User/ You :</span> Refers to
              anyone accessing or using the Services.
            </div>
            <div className="item">
              <span className="font-semibold">Content :</span> Any text, image,
              graphics, videos, etc. that is put on the site or the app of the
              organization or business.
            </div>
            <div className="item">
              <span className="font-semibold">Third Parties : </span>Includes
              any other company or organization that is not affiliated with the
              Company in any way.
            </div>
          </div>
          <li className="my-2 font-semibold uppercase text-lg">
            Eligibility :
          </li>
          <p>To use our services, you must:</p>
          <ul className="list-decimal list-inside">
            <li>
              Be at least of 18 years or provide consent from a parent or a
              legal guardian.{" "}
            </li>
            <li>
              Be truthful and give all the information required during
              registration.
            </li>
            <li>
              Follow all the laws and regulations in relation to the use of our
              Services.{" "}
            </li>
          </ul>
          <li className="my-2 font-semibold uppercase text-lg">
            Use of Services :
          </li>
          <p>These restrictions relate to:</p>
          <ul className="list-disc list-inside">
            <li>Your use of the Services will remain legal and authorised.</li>
            <li>
              You are prohibited from sending or posting any unlawful, obscene,
              indecent or defamatory material. Hacking, viruses, or systems are
              the activities that aim to disturb the Services through any type
              of unlawful intervention. Lying about who you are and where you
              are coming from.
            </li>
            <li>
              Follow all the laws and regulations in relation to the use of our
              Services.{" "}
            </li>
          </ul>
          <li className="my-2 font-semibold uppercase text-lg">
            User Account :
          </li>
          <ul className="list-disc list-inside">
            <li>
              Remember it is your responsibility to keep your username and
              password safe.
            </li>{" "}
            <li>
              You also accept that you exceed reasonable speediness to advise us
              of any unauthorized entry to your account.
            </li>
            <li>
              Link India Now reserves the right to suspend or cancel at any time
              the accounts opened by the users.
            </li>
          </ul>
          <li className="my-2 font-semibold uppercase text-lg">
            Content Ownership and Use :
          </li>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Company Content:</span> All the
              content on Services such as logos, designs, and text are the
              property of Link India Now and they are under the IP laws. You
              might not copy or share them without special consent.
            </li>{" "}
            <li>
              <span className="font-semibold">User Content:</span>
              When you post content e.g., reviews, comments in connection with
              the Services, you also agree to give Link India Now the right to
              use, modify, and display the content without asking for your
              permission from all over the world.
            </li>
          </ul>
          <li className="my-2 font-semibold uppercase text-lg">
            Fees and Payments :
          </li>
          <p>
            {" "}
            Some features or services might be paid. Further, all payments and
            amounts mentioned are clearly stated to be non-refundable unless
            others are stated from the information. Link India Now doesn’t take
            any responsibility for this third party payment failure and
            processing delay.{" "}
          </p>
          <li className="my-2 font-semibold uppercase text-lg">Privacy :</li>
          <p>
            {" "}
            Use of the Services by you is governed by our Privacy Policy. You
            further agree that the use of our Services constitutes your consent
            to the collection and use of your information as set out in the
            Privacy Policy.{" "}
          </p>
          <li className="my-2 font-semibold uppercase text-lg">
            Third-Party Links :
          </li>
          <p>
            {" "}
            The Services may include links to other websites or websites of
            other companies. Link India Now does not sponsor or operate, and is
            not necessarily affiliated with, any third-party commodities unless
            expressly stated otherwise.{" "}
          </p>
          <li className="my-2 font-semibold uppercase text-lg">
            Limitation of Liability :
          </li>
          <p>
            {" "}
            Link India Now shall not be held to account for any direct,
            indirect, incidental ,consequential, or punitive damages which
            result from your utilization of the Services offered through this
            web site. Pursuant to the scenarios described above, we cannot
            ensure that the Services are entirely free of errors, secure or free
            of interruptions. All consequences of the Services’ usage are
            applied at the sole discretion and responsibility of the Users.{" "}
          </p>
          <li className="my-2 font-semibold uppercase text-lg">
            Indemnification :
          </li>
          <p>
            You agree to indemnify and hold Link India Now harmless from any
            claims, damages, losses, or expenses arising out of:
            <ul className="pl-12 max-lg:pl-6 list-disc disc-inside">
              <li>Your use of the Services.</li>
              <li>Your breach of these Terms.</li>
              <li>
                {" "}
                Any violation of third-party rights that may be occasioned by
                your actions will be mapped out.{" "}
              </li>
            </ul>
            Link India Now shall not be held to account for any direct,
            indirect, incidental ,consequential, or punitive damages which
            result from your utilization of the Services offered through this
            web site. Pursuant to the scenarios described above, we cannot
            ensure that the Services are entirely free of errors, secure or free
            of interruptions. All consequences of the Services’ usage are
            applied at the sole discretion and responsibility of the Users.{" "}
          </p>

          <li className="my-2 font-semibold uppercase text-lg">
            Termination :
          </li>
          <p>
            Link India Now also has the rights to block and deny the access to
            the Services by the user without notice and without any possible
            explanation except the cases when the user violates the provisions
            of present Terms and the other cases that may be considered as
            worthy by the Company. Upon termination such use of the Services
            shall cease immediately.
          </p>

          <li className="my-2 font-semibold uppercase text-lg">
          Law and Dispute Regulation :
          </li>
          <p>
          The Terms shall be clarified and
          taken according to the laws of Indian jurisdiction. All conflict,
          controversies, and disputes arising out of or in connection with these
          Terms shall be referred to and heard by arbitration and the
          arbitrator’s decision shall be final. 
          </p>

          <li className="my-2 font-semibold uppercase text-lg">
          New Faqs & Policies :
          </li>
          <p>
          India Now may change these Terms and Conditions from time to time.
          However, the changes that have major impacts will be availed through
          email or on the home page of the website. Any additions, deletions or
          modifications to the Terms will take effect once the consumer carries
          on with the use of the Services.
          </p>

          <li className="my-2 font-semibold uppercase text-lg">
          Contact Us :
          </li>
          <p>
          If you have any questions or concerns regarding these
        Terms, please contact us at:
        <ul className="list list-disc pl-12 max-lg:pl-6">
          <li>Email:</li>
          <li>Phone:</li>
        </ul>
              <span className="font-bold italic">"Your access to and use of
        Link India Now is expressly conditioned on your full agreement with
        these Terms and Conditions."</span>
          </p>
          
          
        </ul>
        <Footer />
      </div>
    </>
  );
};

export default Terms;
