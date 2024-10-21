import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();

  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        notifications.clean();
        notifications.show({
          title: "User Details",
          message: "User details fetched successfully",
        });
        setUserData(data.user);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.name}</h1>
          <p>{userData.email}</p>
          <p>{userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
