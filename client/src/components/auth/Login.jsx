import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { toggleRedirectFlag } from "../../redux/features/redirectFlag/redirectFlagSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const redirectFlag = useSelector((state) => state.redirectFlag);

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
      const id = notifications.show({
        title: "Logging in...",
        message: "Please wait",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
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
        notifications.update({
          id,
          title: "Error in Credentials",
          message: data.errors.email || data.errors.password || "Some error occurred",
          color: "red",
          loading: false,
          autoClose: 3000,
        });
        form.setErrors(data.errors);
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

        // Whether needs to redirect to add company or homepage
        if (redirectFlag) {
          dispatch(toggleRedirectFlag());
          navigate("/companies/add");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      notifications.update({
        id,
        title: "An error occurred",
        message: data.errors.email || data.errors.password || "Please try again",
        color: "red",
        loading: false,
        autoClose: 3000,
      });
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center relative overflow-hidden w-screen h-[100dvh]">
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
        className="form-container flex flex-col items-center justify-center h-full"
      >
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
          className="min-w-[30vw] px-4 max-lg:min-w-[60vw] max-sm:min-w-[80vw] py-8 border-2 border-accent"
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
                className="relative text-sm text-gray-500 overflow-x-hidden pb-[3px] before:absolute before:bottom-0 before:left-0 before:h-[1px] transition-all duration-300 hover:text-primary before:w-0 before:bg-primary hover:before:w-full before:transition-all before:duration-300"
              >
                Sign up
              </Link>
              <Link
                to="/auth/forgot-password"
                size="sm"
                className="relative text-sm text-gray-500 overflow-x-hidden pb-[3px] before:absolute before:bottom-0 before:left-0 before:h-[1px] transition-all duration-300 hover:text-primary before:w-0 before:bg-primary hover:before:w-full before:transition-all before:duration-300"
              >
                Forgot password?
              </Link>
            </Group>

            <Button type="submit" fullWidth mt="xl">
              Sign in
            </Button>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
};

export default Login;
