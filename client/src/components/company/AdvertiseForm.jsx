import { Button, FileInput, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { PayPalButtons } from "@paypal/react-paypal-js";

const AdvertiseForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user || !user?.name) {
    //   notifications.show({
    //     title: "Unauthorized",
    //     message: "Please Login First to Advertise.",
    //     color: "red",
    //     loading: false,
    //     autoClose: 2000,
    //   });
    //   navigate("/auth/login");
    // }
  }, []);

  const form = useForm({
    initialValues: {
      banner: "",
    },
    validate: (values) => ({
      banner: values.banner ? null : "Banner is required",
    }),
  });

  const [bannerUrl, setBannerUrl] = useState("");

  const handleBannerChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateOrder = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/advertisements/create`,
      { method: "POST", credentials: include }
    );
    const data = await response.json();
    return data.id;
  };

  const handleApprove = async (data, actions) => {};

  const handleAdvertise = async (values) => {
    try {
      const formData = new FormData();

      const banner = document.querySelector('input[type="file"]').files[0];
      if (banner) formData.append("banner", banner);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/advertise`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        notifications.show({
          title: "uccessfully Advertised.",
          message: data.message,
          color: "teal",
          loading: false,
          autoClose: 2000,
        });
      } else {
        const data = await response.json();
        form.setErrors(data.errors);
        notifications.update({
          id,
          title: "Unsuccessful.",
          message: data.message,
          loading: false,
          color: "red",
          autoClose: 2000,
        });
      }
    } catch (error) {
      form.setErrors(error.errors);
      console.log(error.message);
      notifications.update({
        id,
        title: "Unsuccessful.",
        message: error.message,
        loading: false,
        color: "red",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center relative overflow-hidden w-screen h-[100dvh]">
      <motion.img
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        src="/backgrounds/login-bg.svg"
        alt="ok"
        className="absolute bottom-0 left-0 min-h-[100dvh] w-screen z-[-2] object-cover max-sm:aspect-[1/1.4] "
      />
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        className="form-container flex flex-col items-center justify-center  h-full"
      >
        <p className="heading">Enter Banner.</p>
        <p>
          Enter banner for <span>{user?.company?.name}</span>
        </p>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          className="min-w-[30vw] px-4 max-lg:min-w-[60vw] max-sm:min-w-[80vw] py-8 border-2 border-accent "
        >
          <form
            onSubmit={form.onSubmit(handleAdvertise)}
            className="flex flex-col items-center gap-6 max-sm:gap-2 w-[90vw] md:w-[60vw] "
          >
            <FileInput
              label="Banner"
              placeholder="Upload your banner"
              className="flex-1 w-full gap-2 flex flex-col"
              accept="image/*"
              {...form.getInputProps("banner")}
              onChange={(file) => {
                form.setFieldValue("banner", file);
                handleBannerChange(file);
              }}
            />
            <div className="image w-full rounded-md aspect-[16/6] flex items-center justify-center overflow-hidden">
              {bannerUrl ? (
                <img
                  src={bannerUrl}
                  alt="Banner"
                  className="w-full aspect-video"
                />
              ) : (
                <img
                  src="/utility/placeholder-card.png"
                  alt="Banner"
                  className="w-1/3"
                />
              )}
            </div>

            <PayPalButtons
            //   createOrder={handleCreateOrder}
            //   onApprove={handleApprove}
            createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: "1.00" } }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert("Transaction completed by " + details.payer.name.given_name);
                });
              }}
              style={{ layout: "vertical" }}
            />

            <Button
              type="submit"
              className="col-span-1 lg:col-span-2 md:col-span-2"
              disabled={form.errors.banner}
              fullWidth
            >
              Advertise Your Company
            </Button>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
};

export default AdvertiseForm;
