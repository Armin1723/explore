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

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  },[user]);

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
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Link to="/auth/register" className="text-blue-800/60 hover:underline">
          Sign up
        </Link>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        className="lg:min-w-[30vw] w-full px-4"
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
            <Anchor href="/auth/register" size="sm">
              Signup
            </Anchor>
            <Anchor href="/auth/forgot-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
