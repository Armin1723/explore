import {
    Image,
    Card,
    Text,
    Group,
    ScrollAreaAutosize,
    Badge,
    Button,
  } from "@mantine/core";
  import { Carousel } from "@mantine/carousel";
  import { FaStar } from "react-icons/fa";
  import { Link } from "react-router-dom";
  import classes from './AdvertisementCard.module.css';
  
  import { useEffect, useState } from "react";
  import striptags from "striptags";
  
const AdvertisementCard = () => {  
  
    const [listing, setListing] = useState(null);

  
    useEffect(() => {
      const fetchAdvertisement = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/advertisement/`,
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
      fetchAdvertisement();  
     
    }, []);
  
    return (
      <ScrollAreaAutosize>
        <Card radius="md" className="flex-1 overflow-y-scroll border relative mt-4">
          <Card.Section>
            <Badge color="gray.3" c='black' className='absolute top-4 right-4 z-[10] bg-opacity-60 text-black'>Promoted</Badge>
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
                      src={image.url}
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
                    className="aspect-video"
                  />
                </Carousel.Slide>
              )}
            </Carousel>
          </Card.Section>
  
          <Group justify="space-between" mt="lg">
            <Link
              to={listing && `/companies/${listing.name.split(" ").join("-")}`}
            >
              <p className="heading !my-0">
                {listing?.name || "Company Name"}
              </p>
            </Link>
  
            <Group gap={5} align="center">
              <FaStar color="gold" />
              <Text fz="sm" fw={600}>
                {(listing && listing?.rating) || "N/A"}
              </Text>
            </Group>
          </Group>
  
          <div className="flex-1 text-md text-gray-600 mt-2 max-h-[30vh] overflow-hidden">
            {listing ? (
              <>
                {striptags(listing?.description).split(' ').split(0, 40).join(' ')}  
              </>
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

            <Button className="my-2" color="primary.2">View Now</Button>

        </Card>
      </ScrollAreaAutosize>
    );
  };

  
  export default AdvertisementCard ;