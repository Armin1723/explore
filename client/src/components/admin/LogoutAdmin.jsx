import { Button } from "@mantine/core";
import React, { useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const LogoutAdmin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.BACKEND_URL}/api/admin/logout`)
            if (!response.ok) {
                throw new Error("An error occurred while logging out");
            }
            dispatch(setUser(null));
            navigate("/admin/login");
            notifications.show({ title: "Logout successful", message: "See you soon.", color: "teal" });
        } catch (error) {
            console.error(error);       
        }
    }
  return (
    <Button onClick={handleLogout}>
      <MdLogout /> <span className="max-sm:hidden">Logout</span>
    </Button>
  );
};

export default LogoutAdmin;
