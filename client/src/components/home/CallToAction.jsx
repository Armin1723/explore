import { Link } from "react-router-dom";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { PiListThin } from "react-icons/pi";
import { MdApproval } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";

const CallToAction = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef(null);

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      gsap.from(".action", {
        x: "-100%",
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".action",
          start: "top 80%",
          end: "top 30%",
        },
      });
      gsap.from(".timeline", {
        x: "100%",
        opacity: 0,
        duration: 1,
        delay: 1,
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
          end: "top 30%",
        },
      });
    },
    { scope: container }
  );
  return (
    <div className="bg-gradient-to-r from-transparent via-teal-200/10 to-transparent w-[90vw]">
      <p className="text-2xl max-sm:text-xl pl-6 md:pl-12 border-l-4 border-teal-400 mt-4">
        Get Started
      </p>
      <div
        ref={container}
        className="flex max-lg:flex-col-reverse items-center min-h-[60vh] max-sm:gap-4"
      >
        <div className="action flex flex-col items-center justify-center h-full max-lg:w-full max-lg:my-6 w-1/2">
          <img
            src="src/assets/get-started.png"
            alt="get started"
            className="object-cover"
          />
        </div>

        <div className="timeline flex items-center justify-center flex-col h-full w-1/2 max-lg:w-full max-lg:my-4 ">
          <p className="text-2xl max-sm:text-xl w-full py-6 text-center">
            Go Live in 3 easy steps.
          </p>
          <Stepper
            active={active}
            onStepClick={setActive}
            className="flex flex-col gap-12 "
          >
            <Stepper.Step
              label="First step"
              className="text-center max-sm:w-full max-sm:px-12"
              description="Create an account"
              icon={<PiListThin />}
            >
              Step 1 : Create a listing using basic details like name, address,
              description and photos.
            </Stepper.Step>
            <Stepper.Step
              label="Second step"
              className="text-center max-sm:w-full max-sm:px-12"
              description="Wait Approval"
              icon={<MdApproval />}
            >
              Step 2 : Wait for approval from admin through your mail.
            </Stepper.Step>
            <Stepper.Step
              label="Final step"
              className="text-center max-sm:w-full max-sm:px-12"
              description="Get full access"
              icon={<FaThumbsUp />}
            >
              Step 3 : Once you get approval email, you are done.
            </Stepper.Step>
            <Stepper.Completed>
              Your listing is now live. Yayy!!
            </Stepper.Completed>
          </Stepper>

          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group><Link to="/companies/add">
            <button className="my-6 relative inline-block p-px font-semibold leading-6 text-white bg-blue-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

              <span className="relative z-10 block px-6 py-3 rounded-xl bg-blue-600 dark:bg-blue-800">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1">
                    Let's get started
                  </span>
                  <svg
                    className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                    data-slot="icon"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
