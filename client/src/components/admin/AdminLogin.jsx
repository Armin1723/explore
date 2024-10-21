import {
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

const AdminLogin = () => {

  const form = useForm({
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user]);

  const handleAdminLogin = async (values) => {
    try {
      const { email, password } = values;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        form.setErrors(data.errors);
      } else {
        const data = await response.json();
        notifications.show({
          title: "Login successful",
          message: "Welcome back",
          color: "teal",
        });
        dispatch(setUser(data.user));
        navigate("/admin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container className="w-full h-screen flex items-center justify-center">
      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        className="w-full max-w-md"
        radius="md"
      >
        <form onSubmit={form.onSubmit(handleAdminLogin)}>
          <h1 className="text-3xl font-semibold py-8">Admin Login</h1>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
