import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Github",
    href: "/",
    icon: <FaGithub className="size-6" />,
  },
  {
    name: "X",
    href: "/",
    icon: <FaTwitter className="size-6" />,
  },
  {
    name: "LinkedIn",
    href: "/",
    icon: <FaFacebook className="size-6" />,
  },
  {
    name: "Whatsapp",
    href: "/",
    icon: <FaWhatsapp className="size-6" />,
  },
];

const support = {
  title: "Support",
  items: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Get Started", href: "/companies/add" },
  ],
};

const quickLinks = {
  title: "Socials",
  items: [
    { label: "Whatsapp", color: "#25D366", href: "/", icon: <FaWhatsapp className="size-6 text-[#25D366] opacity-85 hover:opacity-100"/> },
    { label: "Facebook", color: "#1877F2", href: "/", icon: <FaFacebook className="size-6 text-[#1877F2] opacity-85 hover:opacity-100 "/> },
    { label: "Twitter", color: "#1DA1F2", href: "/", icon: <FaTwitter className="size-6 text-[#1DA1F2] opacity-85 hover:opacity-100" /> },
    { label: "LinkedIn", color: "#0A66C2", href: "/", icon: <FaLinkedin className="size-6 text-[#0A66C2] opacity-85 hover:opacity-100 "/> },
  ],  
};

const category = {
  title: "Category",
  items: [
    { label: "Grocery", href: "/companies/categories?catgory=grocery" },
    { label: "Fashion", href: "/companies/categories?catgory=fashion" },
    { label: "Electronics", href: "/companies/categories?catgory=electronics" },
    { label: "Home", href: "/companies/categories?catgory=home" },
  ],
};

const contact = {
  address: "4517 Washington Ave. Manchester, Kentucky 39495",
  phone: "Phone: (405) 555-0128",
  email: "info@learningonline.com",
};

const Footer = () => {
  return (
    <footer className="bg-primary w-screen h-fit text-secondary mt-8">
      <div className="footer-container flex max-sm:flex-col flex-1 mx-4 pt-24 max-sm:pt-8 pb-4">
        <div className="about-footer mx-12 max-sm:mx-4 w-1/4 max-sm:w-full flex flex-col h-full items-start justify-end ">
          <Link to="/" className="flex items-center justify-start gap-2 my-4">
            <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
              <IoIosTrendingUp className="text-2xl font-bold text-white" />
            </div>
            <p className="font-bold heading text-lg !my-0">LinkIndia </p>
          </Link>
          <p className="text-sm">
            {contact.address}
            <br />
            {contact.phone}
            <br />
            {contact.email}
          </p>
        </div>
        <div className="links flex flex-row max-sm:flex-col max-sm:items-start max-sm:m-6 max-sm:gap-4 justify-evenly flex-grow items-end">
          <div className="support-links flex flex-col">
            <p className="sub-heading text-lg py-1">{support.title}</p>
            {support.items.map((item, index) => {
              return (
                <Link to={item.href} key={index} className="text-sm font-['inter']">
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="category-links flex flex-col">
            <p className="sub-heading text-lg py-1">{category.title}</p>
            {category.items.map((item, index) => {
              return (
                <Link to={item.href} key={index} className="text-sm font-['inter']">
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="social-links flex flex-col">
            <p className="sub-heading text-lg gap-1 py-1">Socials</p>
            {socialLinks.map((item, index) => {
              return (
                <Link to={item.href} key={index} className="text-sm  font-['inter']">
                  {item.name}
                </Link>
              );
            })}
          </div>

        </div>
      </div>
      <div className="bottom-footer !text-xs w-full flex justify-between px-16 max-lg:px-8 max-sm:px-4 max-sm:flex-col py-2 border-t border-gray-100/20">
        <div className="left">
          <p className="!text-xs text-gray-200">
            LinkIndia LLC © 2024. All Rights Reserved.
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
      </div>

      <div className="bg-[#082222] credits">
        <div className="mx-auto flex max-lg:flex-col items-center gap-3 px-4 py-4 md:justify-around">
          <p className="text-center text-gray-200">
            Digicrowd Solutions © 2024.
          </p>
          {/* <ul className="flex items-center gap-3">
            {quickLinks.items.map(( item ) => (
                <Link
                key={item?.label}
                  to={item?.href}
                  title={item?.label}
                  className={`!text-[${item?.color}] hover:text-white`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.icon}
                  <span className="sr-only">{item?.label} account</span>
                </Link>
            ))}
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
