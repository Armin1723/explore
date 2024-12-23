import { Avatar } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";

const NavUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        notifications.show({
          title: "Success",
          message: "Logged out successfully.",
          color: "green",
        });
        dispatch(setUser());
        localStorage.setItem("user", null);
        navigate("/");
      } else {
        notifications.show({
          title: "Error",
          message: data.message || "An error occurred. Please try again later.",
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
      notifications.clean();
      notifications.show({
        title: "Error",
        message: "An error occurred. Please try again later.",
        color: "red",
      });
    }
  };
  return (
    <div className="nav-bottom w-full px-3 flex items-center justify-between rounded-md py-1.5 border border-neutral-500/30">
      <Link
        to={`/users/${user?._id}`}
        className="flex items-center gap-2 hover:text-teal-400 transition-all duration-300"
      >
        <Avatar
          src={user?.profilePic}
          alt={user?.name}
          className="border-2 border-neutral-500 "
        />
        <p className="text-sm">{user?.name}</p>
      </Link>
      <div className="text-sm flex items-center gap-2 px-3 py-1 rounded-md border border-primary bg-primary/5 hover:bg-primary/10 cursor-pointer" onClick={handleLogout}>
        <MdLogout />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default NavUser;
