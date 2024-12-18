import { Breadcrumbs } from "@mantine/core";
import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbNav = () => {
  const location = useLocation();
  const items = location.pathname
    .split("/")
    .filter((item) => item !== "")
    .map((i, index, arr) => {
      let path = arr.slice(0, index + 1).join("/");
      if (path == '/companies') path = '/companies/categories/all'

      return (
        <Link to={`/${path}`} key={i}>
          {i}
        </Link>
      );
    });
  return <div className="flex gap-2 items-center text-xs text-gray-800">
  <Link to="/">
    <FaHome className="" />
  </Link>
  <p>/</p>
  <Breadcrumbs>{items}</Breadcrumbs>
</div>
};

export default BreadCrumbNav;
