import {
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

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
    if (user && user.role === "admin") {
      navigate("/admin");
    }
    localStorage.setItem("user", JSON.stringify(user));
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
        throw new Error(data.message);
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
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <Container size={420} my={40} className="flex flex-col items-center h-screen justify-center">
    <Title ta="center">Welcome back!</Title>

    <Paper
      withBorder
      shadow="md"
      p={30}
      mt={30}
      radius="md"
      className="lg:min-w-[30vw] w-full px-4"
    >
      <form onSubmit={form.onSubmit(handleAdminLogin)}>
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

        <Button type="submit" fullWidth mt="xl">
          Sign in
        </Button>
      </form>
    </Paper>
  </Container>
  );
};

export default AdminLogin;
