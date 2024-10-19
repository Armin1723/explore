import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosTrendingUp } from "react-icons/io";
import { CiReceipt, CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { Avatar, useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { NavLink } from "@mantine/core";
import { categories } from "../../utils/index";
import { FaChevronRight } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const AdminNav = () => {
  const user = useSelector((state) => state.user);
  const { colorScheme } = useMantineColorScheme();
  const location = useLocation();
  return (
    <div
      className={` ${
        colorScheme == "dark" ? "bg-zinc-900 text-white shadow-[0_0_25px_gray] shadow-gray-900" : "bg-white text-black"
      } flex flex-col justify-between items-start sticky top-0  px-4 max-sm:hidden py-4 min-w-[15vw] shadow-[0_1px_30px_gray] shadow-gray-500/60 `}
    >
      <div className="nav-top flex gap-4 justify-start items-center ">
        <Link to="/admin">
          <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
            <IoIosTrendingUp className="text-2xl font-bold text-white" />
          </div>
        </Link>
        <p className="text-xl font-extralight max-lg:text-sm">Explore</p>
      </div>

      <div className="nav-links py-12 flex-col flex-1 items-start w-full">
        <NavLink
          href="/admin/users"
          label="Users"
          style={(theme) => ({
              root:{
                '&:hover': {
                backgroundColor: theme.colors.teal[1],
                color: theme.colors.teal[9],
              },
              }
          })}
          active={location.pathname == "/admin" || location.pathname.includes("/admin/users") }
          leftSection={<CiUser className="text-2xl" />}
        />
        <NavLink
          href="/admin/companies"
          label="Listings"
          leftSection={<CiViewList className="text-2xl" />}
          active={location.pathname.includes("/admin/companies")}
          rightSection={<FaChevronRight />}
        >
          {Object.keys(categories).map((category) => {
            return (
              <NavLink
              key={category}
              href={`/admin/companies/${category}`}
              active={location.pathname.includes(category)}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              childrenOffset={14}
              />
            );
          })}
        </NavLink>
        <NavLink
          href="/admin/reviews"
          label="Reviews"
          leftSection={<CiReceipt className="text-2xl" />}
          active={location.pathname.includes("/admin/reviews")}
        />
        <NavLink
          href="/admin/requests"
          label="Pending Requests"
          leftSection={<MdPendingActions className="text-2xl"/>}
          active={location.pathname.includes("/admin/requests")}
        />
      </div>

      <div className="nav-bottom">
        <Link
          to="/admin/profile"
          className="flex items-center gap-4 hover:text-teal-400 transition-all duration-300"
        >
          <Avatar
            src={user?.profilePic}
            alt={user?.name}
            className="hover:blue-700"
          />
          <p className="max-lg:text-sm">Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
