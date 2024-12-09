import {
  Paper,
  Text,
  Button,
  PinInput,
} from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toggleRedirectFlag } from "../../redux/features/redirectFlag/redirectFlagSlice";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const redirectFlag = useSelector((state) => state.redirectFlag);

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/auth/register");
    }

    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },

    validate: {
      otp: (value) => (value.length === 4 ? null : "Please Fill in OTP."),
    },
  });

  const resendOtp = async () => {
    try {
        const id = notifications.show({
            title: "Resending OTP",
            message: "Please wait",
            loading: true,
            autoClose: false,
            withCloseButton: false,
            });
            const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/resend-otp`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                credentials: "include",
            }
            );
            if (!response.ok) {
            const data = await response.json();
            notifications.update({
                id,
                title: "An error occurred",
                message: data.message,
                color: "red",
                loading: false,
                autoClose: 3000,
            });
            form.setErrors(data.errors);
            } else {
            const data = await response.json();
            setOtpExpired(false);
            form.reset();
            notifications.update({
                id,
                title: "Otp sent successfully",
                message: "Please check your email",
                color: "teal",
                loading: false,
                autoClose: 3000,
            });
            }
        } catch (error) {
            notifications.update({
            id,
            title: "An error occurred",
            message: error.message,
            color: "red",
            loading: false,
            autoClose: 3000,
            });
            console.log(error.message);
        }
    }


  const verifyOtp = async (values) => {
    try {
      const id = notifications.show({
        title: "Verifying OTP",
        message: "Please wait",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
      const { otp } = values;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        notifications.update({
          id,
          title: "An error occurred",
          message: data.message,
          color: "red",
          loading: false,
          autoClose: 3000,
        });
        if(data.expired){
            setOtpExpired(true);
            return;
        }
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
        
        //Checking whether to redirect or not.
        if(redirectFlag){
            dispatch(toggleRedirectFlag())
            navigate("/companies/add");
        }else{
            navigate("/");
        }
      }
    } catch (error) {
      notifications.update({
        id,
        title: "An error occurred",
        message: error.message,
        color: "red",
        loading: false,
        autoClose: 3000,
      });
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center relative overflow-hidden w-screen h-full bg-secondary ">
      {/* <motion.img
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
      /> */}
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
        <p className="heading">Complete Your Registration!</p>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Enter the OTP sent to <span className="text-blue-700">{email}</span>{" "} 
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          className="min-w-[30vw] px-4 max-lg:min-w-[60vw] max-sm:min-w-[80vw] py-8 "
        >
          <form onSubmit={form.onSubmit(verifyOtp)}>
            <PinInput
              withAsterisk
              label="Otp"
              key={form.key("otp")}
              {...form.getInputProps("otp")}
            />

            {form.errors.otp && (
              <Text color="red" size="sm" my='lg'>
                {form.errors.otp}
              </Text>
            )}

            {otpExpired && (
                <div className="text-xs my-2">Your Otp has expired. Request <span className="italic text-blue-600 cursor-pointer hover:text-blue-800" onClick={resendOtp}>another?.</span></div>
            )}

            <Button type="submit" color="brand.5" fullWidth mt="xl">
              Verify
            </Button>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
