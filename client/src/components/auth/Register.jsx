import {
  TextInput,
  PasswordInput,
  NumberInput,
  FileInput,
  Button,
  Group,
  Paper,
  Avatar,
  Box,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const Register = () => {

  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  // Mantine useForm hook for handling form values and validation
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      profilePic: null,
    },

    // Validation rules
    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? null
          : "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      phone: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Phone number must be 10 digits",
      profilePhoto: (value) =>
        value ? null : "Profile photo is required",
    },
  });

  // Profile photo change handler to set preview
  const handleProfilePhotoChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Form submit handler
  const handleSubmit = async (values) => {

    const id = notifications.show({
      id: 'Register',
      title: "Registering Your details.",
      loading: true,
      message:"Please wait while we verify your details.",
      color: 'teal',     
      autoClose: false,
      withCloseButton: false
    })

    const formData = new FormData();

    // Append form values to FormData object
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);

    // Append profile photo to FormData object
    const profilePic = document.querySelector('input[type="file"]').files[0];
    formData.append("profilePic", profilePic);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        notifications.update({
          id,
          title: "Registration successful",
          message: data.message,
          color: "teal",
          autoClose: 2000
        });
        navigate("/auth/login");
      } else {
        const data = await response.json();
        form.setErrors(data.errors);
        notifications.update({
          id,
          title: "Registration Unsuccessful.",
          message: data.message,
          color: "red",
          autoClose: 2000,
        });
      }
    }
    catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
      style={{
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Text fz={'xl'} fw={800} my='lg'>Enter Your Details</Text>
      <form onSubmit={form.onSubmit(handleSubmit)} className="grid max-sm:w-[90vw] max-lg:w-[80vw] w-[60vw] gap-8 max-lg:grid-cols-1 grid-cols-2">
          <div>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              withAsterisk
              {...form.getInputProps("name")}
            />
          </div>
          <div xs={12} md={6}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              withAsterisk
              {...form.getInputProps("email")}
            />
          </div>
          <div xs={12} md={6}>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              withAsterisk
              {...form.getInputProps("password")}
            />
          </div>
          <div xs={12} md={6}>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              withAsterisk
              {...form.getInputProps("confirmPassword")}
            />
          </div>
          <div xs={12} md={6}>
            <NumberInput
              label="Phone"
              placeholder="Enter your phone number"
              withAsterisk
              hideControls
              {...form.getInputProps("phone")}
            />
          </div>
          <div xs={12} md={6} className="flex items-center gap-4">
          {profilePic && (
          <Box mt="md" style={{ display: "flex", justifyContent: "start" }}>
            <Avatar
              src={profilePic}
              size={40}
              radius="50%"
              alt="Profile Preview"
            />
          </Box>
        )}
            <FileInput
              label="Profile Photo"
              placeholder="Upload your profile photo"
              className="flex-1"
              withAsterisk
              accept="image/*"
              {...form.getInputProps("profilePhoto")}
              onChange={(file) => {
                form.setFieldValue("profilePhoto", file);
                handleProfilePhotoChange(file);
              }}
            />
          </div>        

        <Group position="center" mt="xl">
          <Button type="submit" disabled={Object.keys(form.errors).length > 0}>Register</Button>
        </Group>
      </form>
    </Paper>
  );
};

export default Register;
