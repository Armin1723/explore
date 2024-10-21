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
        notifications.show({
          title: "Success",
          message: data.message,
          color: "green",
        });
        navigate("/auth/login");
      } else {
        form.setErrors(data.errors);
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Password Reset!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Reset your password here.
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="lg:min-w-[30vw] w-full px-4"
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
          <Button type="submit" fullWidth mt="xl">
            Update Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
