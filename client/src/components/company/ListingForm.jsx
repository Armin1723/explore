import {
  Avatar,
  Box,
  Button,
  Card,
  FileInput,
  NumberInput,
  Select,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";
import { getSubCategories } from "../../utils";

const ListingForm = ({ nextStep }) => {
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();


  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      category: "",
      subCategory: "",
      address: "",
      website: "",
      number: "",
      logo: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      category: (value) => (value ? null : "Category is required"),
      subCategory: (value) => (value.length > 0 ? null : "Sub Category is required"),
      address: (value) =>
        value.length < 5 ? "Address must have at least 5 characters" : null,
      website: (value) =>
        value && !/www\.\S+\.\S+/.test(value) ? "Invalid URL" : null,
      number: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Phone number must be 10 digits",
    },
  });

  const [logoUrl, setLogoUrl] = useState("");

  const handleLogoChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleListing = async (values) => {
    const id = notifications.show({
      id: "Register",
      title: "Registering Your company.",
      loading: true,
      message: "Please wait while we verify your details.",
      color: "teal",
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("address", values.address);
      if (values.website) formData.append("website", values.website);
      formData.append("number", values.number);

      const logo = document.querySelector('input[type="file"]').files[0];
      if (logo) formData.append("logo", logo);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/register`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        notifications.update({
          id,
          title: "Registration successful",
          message: data.message,
          color: "teal",
          loading: false,
          autoClose: 2000,
        });
        dispatch(setUser(data.user));
        nextStep();
      } else {
        const data = await response.json();
        form.setErrors(data.errors);
        notifications.update({
          id,
          title: "Registration Unsuccessful.",
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
        title: "Registration Unsuccessful.",
        message: error.message,
        loading: false,
        color: "red",
        autoClose: 2000,
      });
    }
  };

  return (
    <Card withBorder rounded="md" shadow="xl">
      <p className="heading">Enter Basic Details of your company.</p>
      <form
        onSubmit={form.onSubmit(handleListing)}
        className="grid grid-cols-2 max-lg:grid-cols-1 items-center gap-6 max-sm:gap-2 w-[90vw] md:w-[60vw]"
      >
        <TextInput
          withAsterisk
          placeholder="Enter the name of your company"
          label="Name"
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          placeholder="Enter email."
          label="Email"
          {...form.getInputProps("email")}
        />

        <Select
          withAsterisk
          label="Category"
          placeholder="Choose a category"
          data={Object.values(categories).map((cat) => cat.name)}
          {...form.getInputProps("category")}
          onChange={(value) => {
            form.setFieldValue("category", value);
            form.setFieldValue("subCategory", "");
          }}
        />

        <Select
          withAsterisk
          label="Sub Category"
          placeholder="Choose a sub category"
          data={getSubCategories(form.values.category) || []}
          disabled={!form.values.category}
          {...form.getInputProps("subCategory")}
        />

        <TextInput
          placeholder="Enter website."
          label="Website"
          {...form.getInputProps("website")}
        />

        <NumberInput
          withAsterisk
          placeholder="Enter phone number."
          label="Number"
          {...form.getInputProps("number")}
        />

        <Textarea
          withAsterisk
          label="Address"
          placeholder="Enter Your Address"
          {...form.getInputProps("address")}
          rows={3}
        />

        <div className="flex items-start gap-4">
          {logoUrl && (
            <Box mt="md" style={{ display: "flex", justifyContent: "start" }}>
              <Avatar
                src={logoUrl}
                size={48}
                radius="50%"
                alt="Logo Preview"
                className="border border-black"
              />
            </Box>
          )}
          <FileInput
            label="Logo"
            placeholder="Upload your logo"
            className="flex-1"
            accept="image/*"
            {...form.getInputProps("logo")}
            onChange={(file) => {
              form.setFieldValue("logo", file);
              handleLogoChange(file);
            }}
          />
        </div>

        <Button
          type="submit"
          color="brand.5"
          className="col-span-1 lg:col-span-2 md:col-span-2"
          fullWidth
        >
          Register Company
        </Button>
      </form>
    </Card>
  );
};

export default ListingForm;
