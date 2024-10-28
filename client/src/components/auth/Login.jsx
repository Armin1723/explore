import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { Header } from "../shared/Header";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
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
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center relative overflow-hidden w-screen h-screen">
      <div className="absolute graphics ball-1 -top-8 -left-1/4 rounded-full w-[55vw] z-[-10] aspect-square bg-gradient-to-r from-secondary to-primary"></div>
      <div className="absolute graphics ball-1 -top-8 -left-1/4 rounded-full w-[54vw] z-[-10] aspect-square bg-white "></div>
      <Header />
      <div className="form-container flex flex-col items-center justify-center h-full">
        <p className="heading">Welcome back!</p>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Link
            to="/auth/register"
            className="text-blue-800/60 hover:underline"
          >
            Sign up
          </Link>
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          className="min-w-[30vw] px-4 max-lg:min-w-[60vw] max-sm:min-w-[80vw] py-8"
        >
          <form onSubmit={form.onSubmit(handleLogin)}>
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
            <Group justify="space-between" mt="lg">
              <Link
                to="/auth/register"
                size="sm"
                className="relative overflow-x-hidden pb-[3px] before:absolute before:bottom-0 before:left-0 before:h-[1px] transition-all duration-300 hover:text-primary before:w-0 before:bg-primary hover:before:w-full before:transition-all before:duration-300"
              >
                Sign up
              </Link>
              <Link
                to="/auth/forgot-password"
                size="sm"
                className="relative overflow-x-hidden pb-[3px] before:absolute before:bottom-0 before:left-0 before:h-[1px] transition-all duration-300 hover:text-primary before:w-0 before:bg-primary hover:before:w-full before:transition-all before:duration-300"
              >
                Forgot password?
              </Link>
            </Group>

            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};
