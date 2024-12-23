import { Paper, Text, Button, Textarea } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { motion } from "framer-motion";

const EnquiryForm = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const { slug } = useParams();

  useEffect(() => {
    if (!user || !user.name) {
      notifications.show({
        title: "Error",
        message: "You must be logged in to send an enquiry.",
        color: "red",
      });
      navigate("/auth");
    }
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      enquiry: "",
    },

    validate: {
      enquiry: (value) => (value.length > 0 ? null : "Enquiry is required"),
    },
  });

  const sendEnquiry = async (values) => {
    const id = notifications.show({
      title: "Sending enquiry...",
      message: "Please wait",
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    try {
      const { enquiry } = values;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/enquiries/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: enquiry,
            slug,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      notifications.update({
        id,
        title: "Enquiry sent",
        message: data.message,
        color: "teal",
        loading: false,
        autoClose: 2000,
      });
      navigate(`/companies/${slug}`);
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
    <div className="flex flex-col items-center justify-center relative overflow-hidden w-screen flex-1">
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
        className="absolute bottom-0 left-0 h-full w-screen z-[-2] object-cover max-sm:aspect-[1/1.4] "
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
        <p className="heading">Send Enquiry</p>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Write a brief enquiry to the company.
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          className="min-w-[30vw] px-4 max-lg:min-w-[60vw] max-sm:min-w-[80vw] py-8 border-2 border-accent"
        >
          <form onSubmit={form.onSubmit(sendEnquiry)}>
            <Textarea
              rows={5}
              withAsterisk
              label="Enquiry"
              placeholder="Write an enquiry."
              key={form.key("enquiry")}
              {...form.getInputProps("enquiry")}
            />

            <Button type="submit" fullWidth mt="xl">
              Send Enquiry
            </Button>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
};

export default EnquiryForm;
