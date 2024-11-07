import {
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  Center,
  Box,
  rem,
} from "@mantine/core";
import classes from "./ForgotPassword.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        notifications.clean();
        notifications.show({
          title: "Success",
          message: data.message,
          color: "green",
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
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
        className="form-container flex flex-col items-center justify-center h-full px-8"
      >
        <div className="heading" ta="center">
          Forgot your password?
        </div>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          mt="xl"
          className="min-w-[30%] px-4 max-lg:min-w-[60%] max-sm:min-w-[90%]"
        >
          <TextInput
            label="Your email"
            placeholder="me@mantine.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Group pt="md">
            {message && (
              <Text fz={"xs"} c="red">
                {message}
              </Text>
            )}
          </Group>
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Link to="/auth/login" c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <div className="flex items-center">
                  <FaArrowLeft
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                  <Box ml={5}>Back to the login page</Box>
                </div>
              </Center>
            </Link>
            <Button className={classes.control} color="primary.3" onClick={handlePasswordReset}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;