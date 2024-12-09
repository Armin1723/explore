import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [error, setError] = React.useState("");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired token");
    }
  }, [token]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? null
          : "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      confirmPassword: (value, values) =>
        value == values.password ? null : "Passwords do not match",
    },
  });

  const handlePasswordReset = async (values) => {
    try {
      const id = notifications.show({
        title: "Updating password...",
        message: "Please wait",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            forgotPasswordToken: token,
            newPassword: values.password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        notifications.update({
          id,
          title: "Success",
          message: data.message,
          color: "green",
          loading: false,
          autoClose: 3000,
        });
        navigate("/auth/login");
      } else {
        form.setErrors(data.errors);
        notifications.update({
          id,
          title: "Error",
          message: data.message,
          color: "red",
          loading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: error.message,
        color: "red",
        loading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center relative overflow-hidden w-screen h-full">
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
        className="form-container flex flex-col items-center justify-center h-full w-screen"
      >
    <div className='flex flex-col items-center justify-center w-full h-full '>
      <div className="heading w-full text-center">Password Reset!</div>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Reset your password here.
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="min-w-[30%] px-4 max-lg:min-w-[60%] max-sm:min-w-[90%]"
      >
        <form onSubmit={form.onSubmit(handlePasswordReset)}>
          <PasswordInput
            withAsterisk
            label="New Password"
            placeholder="Your new password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            withAsterisk
            label="Confirm Password"
            placeholder="Confirm password"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />
          {error && <Text c="red">{error}</Text>}
          <Button type="submit" color="brand.5" fullWidth mt="xl">
            Update Password
          </Button>
        </form>
      </Paper>
    </div>
    </motion.div>
    </div>
  );
};

export default ResetPassword;
