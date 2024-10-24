import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

const About = () => {
    const aboutContainer = useRef(null);
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(()=>{
        gsap.from(".aboutText",{
            x: "-100%", 
            opacity: 0,
            duration: 1,
            scrollTrigger:{
                trigger: aboutContainer.current,
                start:"top 50%",
            }
        })
        gsap.from(".graphics",{
            x: "100%", 
            opacity: 0,
            duration: 1,
            delay: 0.5,
            scrollTrigger:{
                trigger: aboutContainer.current,
                start:"top 50%",
            }
        })
    },{
        scope:aboutContainer
    })

  return (
    <div className="w-screen py-6 flex flex-col items-center">
      <p className="my-4 pl-12 md:pl-6 border-teal-400 border-l-4 font-dm-serif font-[500] text-2xl max-sm:text-xl w-[90%]">
        About Us
      </p>
      <div ref={aboutContainer} className="flex max-lg:flex-col items-center justify-center">
        <div className="aboutText flex flex-col items-center justify-center w-full md:w-1/2">
          <div className="actual-text text-2xl text-justify md:w-[60%] w-4/5">
            We at explore serve the needs of everyone whether it be from getting a job to finding the right company to work for. We are here to help you find the commodities you require in your everyday life.
            We leave no stone unturned in providing you with the best services and products available in the market.
          </div>
        </div>
        <div className="graphics w-full md:w-1/2 flex items-center justify-center">
          <img
            src="src/assets/about.png"
            alt="about"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
