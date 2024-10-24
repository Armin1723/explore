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
    link: "/",
    icon: <FaGithub className="size-6" />,
  },
  {
    name: "X",
    link: "/",
    icon: <FaTwitter className="size-6" />,
  },
  {
    name: "LinkedIn",
    link: "/",
    icon: <FaFacebook className="size-6" />,
  },
  {
    name: "Whatsapp",
    link: "/",
    icon: <FaWhatsapp className="size-6" />,
  },
];

const support = {
  title: "Support",
  items: [
    { label: "Home", href: "#home" },
    { label: "Contact", href: "#contact" },
    { label: "FAQs", href: "#faq" },
    { label: "Get Started", href: "/companies/add" },
  ],
};

const quickLinks = {
  title: "Socials",
  items: [
    { label: "Whatsapp", href: "/", icon: <FaWhatsapp className="size-6" /> },
    { label: "Facebook", href: "/", icon: <FaFacebook className="size-6" /> },
    { label: "Github", href: "/", icon: <FaGithub className="size-6" /> },
    { label: "Twitter", href: "/", icon: <FaTwitter className="size-6" /> },
    { label: "LinkedIn", href: "/", icon: <FaLinkedin className="size-6" /> },
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
    <footer className="bg-[#202842] w-screen">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 py-16 sm:grid-cols-[40fr_30fr_30fr] md:grid-cols-[40fr_30fr_30fr_30fr]">
          <div className="">
            <a href="/" className="mb-8 flex items-center gap-5 text-white">
              <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
                <IoIosTrendingUp className="text-2xl font-bold text-white" />
              </div>
              <h6 className="text-3xl font-semibold tracking-wider">
                <Link to="/" className="flex items-center gap-2">
                  <p className="font-bold text-lg">Explore </p>
                </Link>
              </h6>
            </a>
            <address className="mt-3 text-base font-normal text-[#767E94]">
              <p className="mt-3 max-w-64">{contact.address}</p>
              <p className="mt-3">{contact.phone}</p>
              <p className="mt-3">Mail: {contact.email}</p>
            </address>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{support.title}</h6>
            <ul>
              {support.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#767E94] hover:text-white"
                >
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="mb-7 text-xl text-white">{category.title}</h6>
            <ul>
              {category.items.map(({ label, href }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#767E94] hover:text-white"
                >
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h6 className="mb-7 text-xl text-white">{quickLinks.title}</h6>
            <ul>
              {quickLinks.items.map(({ label, href, icon }) => (
                <li
                  key={label}
                  className="mt-3 text-base font-normal text-[#767E94] hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <a href={href}>{label}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#2E3447]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 md:flex-row md:justify-between">
          <p className="text-center text-[#767E94]">
            Digicrowd Solutions © 2024.
          </p>
          <ul className="flex items-center gap-6">
            {socialLinks.map(({ name, icon, link }) => (
              <li key={name}>
                <a
                  href={link}
                  title={name}
                  className="text-[#767E94] hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                </a>
                <span className="sr-only">{name} account</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
