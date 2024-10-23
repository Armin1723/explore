import { ActionIcon, Card, Group, rem } from "@mantine/core";
import React from "react";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { categories } from "../../utils";

const Footer = () => {
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Listing",
      href: "/companies/add",
    },
    {
      title: "Advertise",
      href: "/advetise",
    },
    {
      title: "Companies",
      href: "/companies",
    },
  ];

  return (
    <Card className="flex footer flex-col w-screen py-6 ">
      <div className="main-footer flex justify-between max-sm:flex-col md:px-12 px-6">
        <div className="info flex flex-col items-start gap-2 pt-6 max-sm:py-12">
          <Link to="/" className="flex items-center gap-2 pl-6 border-l-4 border-teal-400 py-2">
            <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
              <IoIosTrendingUp className="text-2xl font-bold text-white" />
            </div>
            <p className="font-bold text-lg ">Explore </p>
          </Link>
          <p>
            The largest community for locally sourced recommendations and search
            results.
          </p>
        </div>
        <div className="links flex justify-end max-lg:justify-normal gap-12 md:w-3/4 px-6 max-lg:px-0 flex-wrap">
          <div className="categories flex flex-col gap-1">
            <p className="text-lg font-semibold my-2">Categories</p>
            {Object.keys(categories).map((category, idx) => {
              return (
                <Link
                  to={`/companies/categories?category=${category}`}
                  key={idx}
                  className="hover:underline transition-all duration-200"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              );
            })}
          </div>
          <div className="links flex flex-col gap-1">
            <p className="text-lg font-semibold my-2">Links</p>
            {links.map((link, idx) => {
              return (
                <Link
                  to={link.href}
                  key={idx}
                  className="hover:underline transition-all duration-200"
                >
                  {link?.title}
                </Link>
              );
            })}
          </div>
          <div className="social-links flex flex-col">
            <p className="text-lg font-semibold my-2">Social Links</p>
            <Link to="/" className="flex items-center gap-2">
              <FaTwitter style={{ width: rem(18), height: rem(18) }} />
              Twitter
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <FaInstagram style={{ width: rem(18), height: rem(18) }} />
              Instagram
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <FaYoutube style={{ width: rem(18), height: rem(18) }} />
              YouTube
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <FaGithub style={{ width: rem(18), height: rem(18) }} />
              Github
            </Link>
          </div>
        </div>
      </div>

      <div className="socials flex w-full justify-end md:px-12 px-6 py-6">
        <ActionIcon size="lg" color="gray" variant="subtle">
          <FaTwitter style={{ width: rem(18), height: rem(18) }} />
        </ActionIcon>
        <ActionIcon size="lg" color="gray" variant="subtle">
          <FaYoutube style={{ width: rem(18), height: rem(18) }} />
        </ActionIcon>
        <ActionIcon size="lg" color="gray" variant="subtle">
          <FaInstagram style={{ width: rem(18), height: rem(18) }} />
        </ActionIcon>
      </div>
    </Card>
  );
};

export default Footer;
