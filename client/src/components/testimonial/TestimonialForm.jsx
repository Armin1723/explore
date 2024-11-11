import { Button, Card, Rating, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React from "react";

const TestimonialForm = () => {

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      rating: 0,
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) => (value.length > 0 ? null : "Phone number is required"),
      message: (value) => (value.length > 0 ? null : "Message is required"),
      rating: (value) => (value > 0 ? null : "Rating is required"),
    },
  });

  const handleTestimonial = async (values) => {
      const id = notifications.show({
          title: "Submitting Testimonial",
          message: "Please wait...",
          loading: true,
          autoClose: false,
          withCloseButton: false,
      })
    try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/testimonials`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            throw new Error("An error occurred while submitting testimonial");
        }
        const data = await response.json();
        form.reset();
        notifications.update({
            id,
            title: "Success",
            message: data.message,
            color: "green",
            loading: false,
            withCloseButton: true,
            autoClose: 3000,
        });

    }catch(error){
        console.error(error);
        notifications.update({
            id,
            title: "Error",
            message: error.message || "An error occurred. Please try again later.",
            color: "red",
            loading: false,
            withCloseButton: true,
            autoClose: 3000,
        });
    }
  };

  return (
    <Card shadow="lg" withBorder rounded="lg" className="flex flex-col w-[90%]">
      <p className="sub-heading">Share Your Views about Explore</p>
      <form
        onSubmit={form.onSubmit(handleTestimonial)}
        className="flex flex-col gap-2"
      >
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Phone"
          placeholder="Your Phone Number"
          key={form.key("phone")}
          {...form.getInputProps("phone")}
        />
        <div className="rating flex flex-col gap-2">
          <p className="text-sm">
            Rating <span className="text-red-500">*</span>
          </p>
          <Rating
            label="Rating"
            key={form.key("rating")}
            {...form.getInputProps("rating")}
          />

          {form.errors.rating && (
            <p className="text-red-500 text-sm">{form.errors.rating}</p>
          )}
        </div>
        <Textarea
          withAsterisk
          rows={5}
          label="Message"
          placeholder="Your Message"
          key={form.key("message")}
          {...form.getInputProps("message")}
        />

        <Button
          type="submit"
          color="primary.3"
          disabled={Object.keys(form.errors).length > 0}
          fullWidth
        >
          Send Testimonial
        </Button>
      </form>
    </Card>
  );
};

export default TestimonialForm;
