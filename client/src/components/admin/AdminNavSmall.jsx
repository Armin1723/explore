import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosTrendingUp } from "react-icons/io";
import { CiReceipt, CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { Avatar, ScrollArea, useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { NavLink } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";
import { MdCategory, MdPendingActions } from "react-icons/md";

const AdminNavSmall = () => {
  const user = useSelector((state) => state.user);
  const { colorScheme } = useMantineColorScheme();
  const location = useLocation();

  const categories = useSelector((state) => state.categories);
  return (
    <div
      className={` ${
        colorScheme == "dark"
          ? "bg-zinc-900 text-white shadow-[0_0_25px_gray] shadow-gray-900"
          : "bg-white text-black"
      } flex flex-col justify-between items-start h-[90dvh]`}
    >
      <div className="nav-top flex gap-4 justify-start items-center ">
        <Link to="/admin">
          <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
            <IoIosTrendingUp className="text-2xl font-bold text-white" />
          </div>
        </Link>
        <p className="text-xl font-extralight max-lg:text-sm">Explore</p>
      </div>

      {/* <ScrollArea h={600} className="w-full"> */}
        <div className="nav-links py-12 flex-col flex-1 items-start w-full">
          <NavLink
            href="/admin/users"
            label="Users"
            style={(theme) => ({
              root: {
                "&:hover": {
                  backgroundColor: theme.colors.teal[1],
                  color: theme.colors.teal[9],
                },
              },
            })}
            active={
              location.pathname == "/admin" ||
              location.pathname.includes("/admin/users")
            }
            leftSection={<CiUser className="text-2xl" />}
          />
          <NavLink
            href="/admin/companies"
            label="Listings"
            leftSection={<CiViewList className="text-2xl" />}
            active={location.pathname.includes("/admin/companies")}
            rightSection={<FaChevronRight />}
          >
            <ScrollArea h={400} className="w-full">
              <NavLink
                href={`/admin/companies/all`}
                active={location.pathname.includes("all")}
                label="All"
                childrenOffset={14}
              />
              {Object.values(categories).map((category) => {
                return (
                  <NavLink
                    key={category?.name}
                    href={`/admin/companies/${category?.name}`}
                    active={location.pathname.includes(category?.name)}
                    label={
                      category?.name.charAt(0).toUpperCase() +
                      category?.name.slice(1)
                    }
                    childrenOffset={14}
                  />
                );
              })}
            </ScrollArea>
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
            leftSection={<MdPendingActions className="text-2xl" />}
            active={location.pathname.includes("/admin/requests")}
          />
          <NavLink
            href="/admin/categories"
            label="Categories"
            leftSection={<MdCategory className="text-2xl" />}
            active={location.pathname.includes("/admin/categories")}
          />
        </div>
      {/* </ScrollArea> */}

      <div className="nav-bottom">
        <Link
          to={`/users/${user?._id}`}
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

export default AdminNavSmall;
