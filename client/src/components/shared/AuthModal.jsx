import {
  Avatar,
  Box,
  Button,
  FileInput,
  NumberInput,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

const AuthModal = ({ close }) => {
  const [method, setMethod] = useState("login");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profilePic, setProfilePic] = useState(null);

  const loginForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 8
          ? null
          : "Password should contain at least 8 characters",
    },
  });

  const handleLogin = async (values) => {
    try {
      const id = notifications.show({
        title: "Logging in...",
        message: "Please wait",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        notifications.update({
          id,
          title: "Error in Credentials",
          message:
            data.errors.email || data.errors.password || "Some error occurred",
          color: "red",
          loading: false,
          autoClose: 3000,
        });
        loginForm.setErrors(data.errors);
      } else {
        const data = await response.json();
        notifications.update({
          id,
          title: "Login successful",
          message: "Welcome back",
          color: "teal",
          loading: false,
          autoClose: 3000,
        });
        dispatch(setUser(data.user));

        close();
      }
    } catch (error) {
      notifications.update({
        id,
        title: "An error occurred",
        message:
          data.errors.email || data.errors.password || "Please try again",
        color: "red",
        loading: false,
        autoClose: 3000,
      });
      console.log(error.message);
    }
  };

  const registerForm = useForm({
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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      phone: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Phone number must be 10 digits",
      profilePhoto: (value) => (value ? null : "Profile photo is required"),
    },
  });

  const handleProfilePhotoChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = async (values) => {
    const id = notifications.show({
      id: "Register",
      title: "Registering Your details.",
      loading: true,
      message: "Please wait while we verify your details.",
      color: "teal",
      autoClose: false,
      withCloseButton: false,
    });

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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        {
          method: "POST",
          body: formData,
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
        setMethod("login");
      } else {
        const data = await response.json();
        registerForm.setErrors(data.errors);
        notifications.update({
          id,
          title: "Registration Unsuccessful.",
          message: data.message,
          color: "red",
          loading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col w-full items-start">
      <p className="heading !my-2 pl-6 border-primary border-l-4 capitalize min-w-[40vw] max-lg:min-w-[60vw] max-sm:min-w-[80vw]">
        {method}
      </p>

      {method === "login" ? (
        <div
          key="loginForm"
          className="login-form-container flex flex-col items-start justify-center h-full w-full                                  "
        >
          <p className="sub-heading">Welcome back!</p>
          <div className="text-gray-400 text-xs my-2 flex gap-2">
            Do not have an account yet?{" "}
            <div
              onClick={() => setMethod("register")}
              className="text-blue-800/60 hover:underline cursor-pointer"
            >
              Sign up
            </div>
          </div>

          <form onSubmit={loginForm.onSubmit(handleLogin)} className="w-full">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={loginForm.key("email")}
              {...loginForm.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your password"
              key={loginForm.key("password")}
              {...loginForm.getInputProps("password")}
            />

            <Button
              type="submit"
              color="primary.3"
              disabled={Object.keys(loginForm.errors).length > 0}
              fullWidth
              mt="xl"
            >
              Log In
            </Button>
          </form>
        </div>
      ) : (
        <div
          key="signupForm"
          className="signup-form-container flex flex-col items-start justify-center h-full w-full px-2"
        >
          <div className="sub-heading">Enter Your Details</div>
          <div className="flex gap-2 text-xs text-gray-400 my-2">
            Already have an account?{" "}
            <div
              onClick={() => setMethod("login")}
              className="text-blue-800/60 hover:underline"
            >
              Log In
            </div>
          </div>
          <form
            onSubmit={registerForm.onSubmit(handleRegister)}
            className="grid gap-4 max-lg:grid-cols-1 grid-cols-2 w-full"
          >
            <div>
              <TextInput
                label="Name"
                placeholder="Enter your name"
                withAsterisk
                {...registerForm.getInputProps("name")}
              />
            </div>
            <div xs={12} md={6}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                withAsterisk
                {...registerForm.getInputProps("email")}
              />
            </div>
            <div xs={12} md={6}>
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...registerForm.getInputProps("password")}
              />
            </div>
            <div xs={12} md={6}>
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                withAsterisk
                {...registerForm.getInputProps("confirmPassword")}
              />
            </div>
            <div xs={12} md={6}>
              <NumberInput
                label="Phone"
                placeholder="Enter your phone number"
                withAsterisk
                hideControls
                {...registerForm.getInputProps("phone")}
              />
            </div>
            <div className="flex items-center gap-4">
              {profilePic && (
                <Box
                  mt="md"
                  style={{ display: "flex", justifyContent: "start" }}
                >
                  <Avatar
                    src={profilePic}
                    size={48}
                    radius="50%"
                    alt="Profile Preview"
                    className="border-2 border-black"
                  />
                </Box>
              )}
              <FileInput
                label="Profile Photo"
                placeholder="Upload your profile photo"
                className="flex-1 md:max-w-[20vw] max-w-[60vw]"
                withAsterisk
                accept="image/*"
                {...registerForm.getInputProps("profilePhoto")}
                onChange={(file) => {
                  registerForm.setFieldValue("profilePhoto", file);
                  handleProfilePhotoChange(file);
                }}
              />
            </div>

            <div className="w-full text-center md:col-span-2">
              <Button
                fullWidth
                type="submit"
                color="primary.3"
                disabled={Object.keys(registerForm.errors).length > 0}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthModal;