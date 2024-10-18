import React from "react";
import { Link } from "react-router-dom";
import { IoIosTrendingUp } from "react-icons/io";
import { CiReceipt, CiUser } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { Avatar } from "@mantine/core";
import { useSelector } from "react-redux";

const AdminNav = () => {
    const user = useSelector((state) => state.user);
  return (
    <div className="bg-[#3e4c67] text-gray-400 flex flex-col justify-between items-start px-4 max-sm:hidden py-4 min-w-[15vw] shadow-[0_1px_30px_gray] shadow-gray-500/60 ">
      <div className="nav-top flex gap-4 justify-start items-center ">
        <Link to="/admin">
          <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
            <IoIosTrendingUp className="text-2xl font-bold text-white" />
          </div>
        </Link>
        <p className="text-xl font-extralight text-white">Explore</p>
      </div>

      <div className="nav-links py-12 flex flex-col gap-4 flex-1 items-start">
        <Link
          to="/admin/users"
          className="flex gap-4 hover:text-teal-400 transition-all duration-300"
        >
          <CiUser className="text-2xl" />
          <p>Users</p>
        </Link>

        <Link
          to="/admin/listings"
          className="flex gap-4 hover:text-teal-400 transition-all duration-300"
        >
          <CiViewList className="text-2xl" />
          <p>Listings</p>
        </Link>

        <Link
          to="/admin/reviews"
          className="flex gap-4 hover:text-teal-400 transition-all duration-300"
        >
          <CiReceipt className="text-2xl" />
          <p>Reviews</p>
        </Link>
      </div>

      <div className="nav-bottom">
        <Link
          to="/admin/profile"
          className="flex items-center gap-4 hover:text-teal-400 transition-all duration-300"
        >
          <Avatar src={user?.profilePic} alt={user?.name} className="!hover:color-teal-400"/>
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminNav;
