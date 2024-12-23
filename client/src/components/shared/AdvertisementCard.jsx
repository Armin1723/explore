import { Image, Group, Badge, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./AdvertisementCard.module.css";

import { useEffect, useState } from "react";
import striptags from "striptags";
import CompanyCardSmall from "../company/CompanyCardSmall";

const AdvertisementCard = ({ slug = "" }) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // const fetchAdvertisement = async () => {
    //   try {
    //     const response = await fetch(
    //       `${import.meta.env.VITE_BACKEND_URL}/api/advertisement/`
    //     );
    //     if (!response.ok) {
    //       throw new Error(response.statusText);
    //     }
    //     const data = await response.json();
    //     if (!data.company) {
    //       setListing(null);
    //       return;
    //     }
    //     setListing(data.company);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchAdvertisement();
    const fetchPlaceholderCompany = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/company/placeholder?slug=${slug}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if (!data.company) {
          setListing(null);
          return;
        }
        setListing(data.company);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaceholderCompany();
  }, [slug]);

  return (
    <>
      <div className=" max-lg:hidden overflow-y-auto z-[999999] border border-neutral-500/20 hover:border-neutral-500/40 relative mt-4 rounded-md ">
        <Badge
          color="gray.3"
          c="black"
          className="absolute top-4 right-4 z-[10] bg-opacity-60 text-black"
        >
          Promoted
        </Badge>
        <Carousel
          withIndicators
          loop
          autoPlay
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {listing && listing.gallery.length > 0 ? (
            listing?.gallery?.map((image) => (
              <Carousel.Slide key={image}>
                <Image
                  src={image.url?.replace(
                    "/upload/",
                    "/upload/w_500,h_400,c_fill/"
                  )}
                  height={220}
                  className="aspect-video"
                />
              </Carousel.Slide>
            ))
          ) : (
            <Carousel.Slide>
              <Image
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                height={220}
                className="aspect-video !w-full"
              />
            </Carousel.Slide>
          )}
        </Carousel>

        <Group justify="space-between" my="lg" px="sm">
          <Link to={listing && `/companies/${listing?.slug}`}>
            <p className="heading !my-0">{listing?.name || "Company Name"}</p>
          </Link>

          <div className="flex items-center gap-2">
            <FaStar color="gold" className="flex my-auto" />
            <p className="text-sm text-gray-900">
              {(listing && listing?.rating.toFixed(2)) || "N/A"}
            </p>
          </div>
        </Group>

        <div className="flex-1 text-sm text-gray-600 my-2 max-h-[30vh] overflow-hidden px-3">
          {listing ? (
            <div className="line-clamp-[8]">
              {striptags(listing?.description)}
            </div>
          ) : (
            <>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              molestias natus earum dolore asperiores! Repudiandae
              exercitationem inventore iste, tempora corrupti dolorum laboriosam
              laudantium natus ipsum fuga esse obcaecati perferendis aperiam
              nobis, ut nesciunt? Deleniti fugiat exercitationem, nam quibusdam!
              rbduentim.
            </>
          )}
          ...
        </div>

        <div className="w-full !px-4 py-2">
          <Button
            component={Link}
            to={listing && `/companies/${listing?.slug}`}
            className="my-2"
            fullWidth
            variant="outline"
            color="brand.5"
          >
            View Now
          </Button>
        </div>
      </div>

      <div className="lg:hidden flex w-full">
        <CompanyCardSmall company={listing} promoted={true}/>
      </div>
    </>
  );
};

export default AdvertisementCard;
