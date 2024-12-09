import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapPin,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const support = {
  title: "Support",
  items: [
    // { label: "Home", href: "#home" },
    { label: "Get Started", href: "/companies/add" },
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-and-conditions" },
  ],
};

const socialIcons = {
  items: [
    {
      label: "Whatsapp",
      color: "#25D366",
      href: "/",
      icon: (
        <div className="bg-gradient-to-br size-6 flex items-center justify-center from-[#25d366] via-[green] to-[seaGreen] p-1 rounded-full">
          <FaWhatsapp className="opacity-85 hover:opacity-100" />
        </div>
      ),
    },
    {
      label: "Facebook",
      color: "#1877F2",
      href: "/",
      icon: (
        <FaFacebook className="size-6 text-[#1877F2] opacity-85 hover:opacity-100 " />
      ),
    },
    {
      label: "Instagram",
      color: "#FD1DFD",
      href: "/",
      icon: (
        <div className="bg-gradient-to-br size-6 flex items-center justify-center from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] p-1 rounded-full">
          <FaInstagram className="opacity-85 hover:opacity-100" />
        </div>
      ),
    },
    {
      label: "LinkedIn",
      color: "#0A66C2",
      href: "/",
      icon: (
        <FaLinkedin className="size-6 text-[#0A66C2] opacity-85 hover:opacity-100 " />
      ),
    },
  ],
};

const category = {
  title: "Category",
  items: [
    { label: "Grocery", href: "/companies/categories?category=Grocery" },
    { label: "Fashion", href: "/companies/categories?category=Fashion" },
    {
      label: "Electronics",
      href: "/companies/categories?category=Electronics",
    },
    { label: "Home", href: "/companies/categories?category=Home" },
    // { label: "Books", href: "/companies/categories?category=Books" },
    { label: "Fitness", href: "/companies/categories?category=Fitness" },
  ],
};

const contact = {
  address: "4517 Washington Ave. Manchester, Kentucky 39495",
  phone: "Phone: (405) 555-0128",
  email: "info@learningonline.com",
};

const Footer = () => {
  return (
    <footer className="bg-[#000033] w-screen h-fit text-secondary border-t border-neutral-500/40 mt-8">
      <div className="footer-container flex max-lg:flex-col flex-1 mx-4 pt-24 max-sm:pt-8 pb-4 ">
        <div className="about-footer mx-12 w-full md:max-w-[50%] lg:max-w-[33%] max-sm:mx-4 max-sm:w-full flex flex-col h-full items-start justify-end ">
          <Logo variant='white' />
          <p className="text-sm px-3">
            Link India Now is the best search engine platform serving you with everything that you need.
          </p>
        </div>
        <div className="links flex flex-row max-lg:flex-col mx-12 max-sm:mx-4 max-lg:items-start max-lg:justify-between max-sm:m-6 max-sm:gap-4 justify-evenly flex-1 ">
          <div className="flex links-container flex-1 w-full">
            <div className="support-links flex flex-col gap-2 flex-1">
              <p className="sub-heading text-xl py-1 pb-2 my-3 w-fit cursor-pointer relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:rounded-full before:w-1/2 before:bg-white before:transition-all before:duration-200 before:ease-in">
                {support.title}
              </p>
              {support.items.map((item, index) => {
                return (
                  <Link
                    to={item.href}
                    key={index}
                    className="text-sm hover:translate-x-2 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="category-links flex flex-col gap-2 flex-1">
              <p className="sub-heading text-xl py-1 pb-2 my-3 w-fit cursor-pointer relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:rounded-full before:w-1/2 before:bg-white before:transition-all before:duration-200 before:ease-in">
                {category.title}
              </p>
              {category.items.map((item, index) => {
                return (
                  <Link
                    to={item.href}
                    key={index}
                    className="text-sm hover:translate-x-2 transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="contact flex flex-col gap-2 flex-1 max-lg:w-full">
            <p className="sub-heading text-xl gap-1 py-1 pb-2 my-3 w-fit cursor-pointer relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:rounded-full before:w-1/2 before:bg-white before:transition-all before:duration-200 before:ease-in">
              Contact
            </p>
            <div className="social-icons flex gap-4 my-2 text-sm">
              {socialIcons.items.map((item, index) => {
                return (
                  <Link
                    to={item.href}
                    key={index}
                    className="text-sm hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                  >
                    {item.icon}
                  </Link>
                );
              })}
            </div>
            <div className="text-sm address flex items-center gap-2">
              <FaMapPin />
              <p>{contact.address}</p>
            </div>
            <div className="text-sm phone flex items-center gap-2">
              <FaPhone />
              <p>{contact.phone}</p>
            </div>
            <div className="text-sm email flex items-center gap-2">
              <MdEmail />
              <p>{contact.email}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bottom-footer !text-xs w-full flex justify-between px-16 max-lg:px-8 max-sm:px-4 max-sm:flex-col py-2 border-t border-gray-100/20">
        <div className="left">
          <p className="!text-xs text-gray-200">
            Link India LLC © 2024. All Rights Reserved.
          </p>
        </div>

        <div className="right flex gap-2">
          <Link to="/privacy-policy" className="hover:text-blue-600 transition">
            
            Privacy Policy
          </Link>
          <p>|</p>
          <Link to="/terms-and-conditions" className="hover:text-blue-600 transition">
            
            Terms of Use
          </Link>

        </div>
      </div> */}

      <div className="bg-[#000022] credits">
        <div className="mx-auto flex max-lg:flex-col items-center gap-3 px-4 py-4 justify-center">
          <p className="text-gray-200">
            Link India LLC © 2024. All Rights Reserved.
          </p>
          <div className="divider max-lg:hidden">|</div>
          <p className="text-center text-gray-200">
            Digicrowd Solutions © 2024.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
