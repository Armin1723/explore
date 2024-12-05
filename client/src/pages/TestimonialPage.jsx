import React, { useEffect, useState } from "react";
import { Header } from "../components/shared/Header";
import { Button, Divider, ScrollArea } from "@mantine/core";
import TestimonialForm from "../components/testimonial/TestimonialForm";
import Footer from "../components/shared/Footer";
import TestimonialCard from "../components/testimonial/TestimonialCard";
import { Helmet } from "react-helmet-async";

const TestimonialPage = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/testimonials?page=${page}&sort=${sort}`
        );
        if (!response.ok) {
          throw new Error("An error occurred while fetching testimonials");
        }
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [page, sort]);

  return (
    <>
      {/* Meta Tags */}
      <Helmet>
        <title>Testimonials | LinkIndia Portal</title>
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
        <meta property="og:title" content="Testimonials | LinkIndia Portal" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/testimonials`}
        />
      </Helmet>

      {/* Content */}
      <div className="w-screen flex flex-col items-center mt-[10vh] bg-secondary font-['Inter']">
        <Header />

        <div className="banner relative w-full overflow-hidden aspect-[16/3]">
          <img
            src="/backgrounds/testimonials-bg.png"
            alt="testimonials"
            className="w-full object-cover bg-center center/cover aspect-[16/3]"
          />
          {/* <div className="overlay !my-0 bg-black/10 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="heading !my-0 !text-3xl !max-lg:text-2xl !max-sm:text-xl text-white">
              {" "}
              Testimonials
            </p>
          </div> */}
        </div>

        <div className="testimonial-container flex max-lg:flex-col items-start w-[90%] max-lg:w-full mt-6">
          <div className="testimonials flex flex-col items-center w-1/2 max-lg:w-full max-lg:px-6 gap-6">
            <p className="heading text-left border-l-4 border-primary pl-6 w-[90%] !my-1">
              Testimonials
            </p>
            <Divider className="w-[90%] mt-2" />
            <div className="sort flex w-[90%] gap-4 ">
              <Button
                onClick={() => setSort("latest")}
                variant={sort === "latest" ? "filled" : "outline"}
                color="primary.3"
                className={`!my-0 ${sort === "latest" && "border-primary"}`}
              >
                Latest
              </Button>
              <Button
                onClick={() => setSort("popular")}
                variant={sort === "popular" ? "filled" : "outline"}
                color="primary.3"
                className="!my-0"
              >
                Popular
              </Button>
            </div>
            <ScrollArea
              offsetScrollbars
              scrollbarSize={6}
              scrollHideDelay={500}
              h={400}
              className="w-[90%] max-lg:w-full px-2"
            >
              {results &&
                results?.testimonials.map((testimonial, index) => {
                  return (
                    <TestimonialCard key={index} testimonial={testimonial} />
                  );
                })}

              {results && results.hasMore && (
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  variant="outline"
                  color="primary.3"
                >
                  Load More
                </Button>
              )}
            </ScrollArea>
          </div>

          <div className="form flex flex-col items-center justify-start flex-1 w-1/2 max-lg:w-full max-lg:px-2 py-8">
            <TestimonialForm />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TestimonialPage;
