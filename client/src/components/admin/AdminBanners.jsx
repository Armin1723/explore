import React, { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Button, Card, Image, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MdDelete, MdUndo } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

const AdminBanners = () => {
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/advertisement/banners?forAdmin=true`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Network response was not ok");
        }
        setBanners(data.banners);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchBanners();
  }, [refetch]);

  const removeBanner = async (banner) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/advertisement/banner/${
          banner.name
        }`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to remove banner");
      }
      const data = await response.json();
      notifications.show({
        title: "Success",
        message: data.message,
        color: "teal",
        autoClose: 3000,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
        autoClose: 3000,
      });
      console.error(error);
    }
    setBanners(banners.filter((img) => img !== banner));
    setNoChange(false);
  };

  return (
    <Card className="flex flex-col flex-1" withBorder>
      <div className="heading w-full border-l-4 border-primary my-4 flex gap-3 items-center ">
        <p className="pl-6 text-xl tracking-wide">Banners</p>
        <p
          onClick={() => setRefetch(!refetch)}
          className="p-2 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300"
        >
          <MdUndo />
        </p>
      </div>

      {loading && (
        <div className="w-full min-h-[40vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      <div className="users-container min-h-[50px] max-h-[600px] overflow-y-auto flex flex-col">
        {banners && banners.length > 0 ? (
          <Carousel
            slideSize={{ base: "100%" }}
            slideGap={{ base: "xl", sm: "md" }}
            height={300}
            align="start"
          >
            {banners.map((banner, index) => (
              <Carousel.Slide key={index}>
                <Link
                  to={`/companies/${banner.name.split(" ").join("-")}`}
                  className="banner"
                >
                  <Image
                    src={banner.image.replace("upload/", "upload/w_1400/")}
                    alt={`Preview ${index + 1}`}
                    withPlaceholder
                    className="w-full h-full !rounded-md select-none"
                    fit="cover"
                  />
                </Link>
                <div
                  onClick={open}
                  className="absolute z-20 top-0 right-6 max-sm:right-12 translate-y-1/2 p-2 rounded-full bg-gray-100/50 hover:bg-gray-300 transition-all duration-300 cursor-pointer border border-gray-500 shadow-lg"
                >
                  <MdDelete />
                </div>
                <Modal opened={opened} onClose={close} centered title="">
                  <Card className="flex flex-col gap-2">
                    <p className="heading pl-6 border-l-4 border-primary !text-xl !my-0">
                      Remove Banner?
                    </p>
                    <p className="text-sm text-gray-600">
                      Are you sure about removing this banner? This action can't
                      be undone
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      <Button
                        color="brand.5"
                        onClick={() => {
                          removeBanner(banner);
                          close();
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        onClick={close}
                        c="black"
                        className="!border-black"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card>
                </Modal>
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <p className="py-2">No banners found</p>
        )}
      </div>

    </Card>
  );
};

export default AdminBanners;
