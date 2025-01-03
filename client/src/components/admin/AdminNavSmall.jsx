import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CiReceipt, CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { ScrollArea, useMantineColorScheme } from "@mantine/core";
import { useSelector } from "react-redux";
import { NavLink } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";
import { MdCategory, MdPendingActions } from "react-icons/md";
import { IoChatbubbleEllipses } from "react-icons/io5";
import NavUser from "./NavUser";

const AdminNavSmall = ({ closeDrawer }) => {
  const user = useSelector((state) => state.user);
  const { colorScheme } = useMantineColorScheme();
  const location = useLocation();

  const categories = useSelector((state) => state.categories);
  return (
    <div
      className={` ${
        colorScheme == "dark"
          ? "bg-transparent text-white shadow-[0_0_25px_gray] shadow-gray-900"
          : "bg-white text-black"
      } flex flex-col justify-between items-start h-[85vh]`}
    >
      <div className="nav-links flex-col flex-1 items-start w-full">
        <NavLink
          component={Link}
          to="/admin/users"
          label="Users"
          onClick={closeDrawer}
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
          component={Link}
          to="/admin/companies"
          label="Listings"
          leftSection={<CiViewList className="text-2xl" />}
          active={location.pathname.includes("/admin/companies")}
          rightSection={<FaChevronRight />}
        >
          <ScrollArea
            offsetScrollbars
            scrollbarSize={6}
            scrollHideDelay={500}
            h={400}
            className="w-full"
          >
            <NavLink
              component={Link}
              to={`/admin/companies/all`}
              active={location.pathname.includes("all")}
              label="All"
              onClick={closeDrawer}
              childrenOffset={14}
            />
            {Object.values(categories).map((category) => {
              return (
                <NavLink
                  key={category?.name}
                  component={Link}
                  to={`/admin/companies/${category?.name}`}
                  active={location.pathname.includes(category?.name)}
                  label={
                    category?.name.charAt(0).toUpperCase() +
                    category?.name.slice(1)
                  }
                  onClick={closeDrawer}
                  childrenOffset={14}
                />
              );
            })}
          </ScrollArea>
        </NavLink>
        <NavLink
          component={Link}
          to="/admin/enquiries"
          label="Enquiries"
          leftSection={<IoChatbubbleEllipses className="text-2xl" />}
          active={location.pathname.includes("/admin/enquiries")}
        />

        <NavLink
          component={Link}
          to="/admin/reviews"
          label="Reviews"
          onClick={closeDrawer}
          leftSection={<CiReceipt className="text-2xl" />}
          active={location.pathname.includes("/admin/reviews")}
        />
        <NavLink
          component={Link}
          to="/admin/requests"
          label="Pending Requests"
          onClick={closeDrawer}
          leftSection={<MdPendingActions className="text-2xl" />}
          active={location.pathname.includes("/admin/requests")}
        />
        <NavLink
          component={Link}
          to="/admin/categories"
          label="Categories"
          onClick={closeDrawer}
          leftSection={<MdCategory className="text-2xl" />}
          active={location.pathname.includes("/admin/categories")}
        />
      </div>

      <NavUser user={user} />
    </div>
  );
};

export default AdminNavSmall;
