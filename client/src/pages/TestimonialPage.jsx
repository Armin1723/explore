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
        <title>Testimonials | Link India Portal</title>
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
        <meta property="og:title" content="Testimonials | Link India Portal" />
        <meta
          property="og:description"
          content="Link India Portal helps you find the best businesses and services in your city, offering grocery, sports, electronics, fashion, books, and home essentials."
        />
        <meta property="og:image" content="/backgrounds/testimonials-bg.webp" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_FRONTEND_URL}/testimonials`}
        />
      </Helmet>

      {/* Content */}
      <div className="w-screen flex flex-col items-center bg-secondary">
        <Header />

        <div className="banner relative w-full overflow-hidden aspect-[16/3] max-sm:aspect-[16/5]">
          <img
            src="/backgrounds/testimonials-bg.webp"
            alt="testimonials"
            className="w-full h-full object-cover max-sm:object-cover bg-center center/cover "
          />
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
                color="brand.5"
                className={`!my-0 ${sort === "latest" && "border-primary"}`}
              >
                Latest
              </Button>
              <Button
                onClick={() => setSort("popular")}
                variant={sort === "popular" ? "filled" : "outline"}
                color="brand.5"
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
                  color="brand.5"
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
