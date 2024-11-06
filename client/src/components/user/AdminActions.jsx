import { Button, Menu, rem } from "@mantine/core";
import React from "react";
import { GoChevronDown } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const AdminActions = ({ userData, setUserData }) => {
  const toggleSuspendUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/suspend/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userData._id }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Menu>
      <Menu.Target>
        <Button className="flex items-center gap-1 justify-center">
            <p>Actions</p>
            <GoChevronDown style={{ width: rem(16), height: rem(16) }} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          {userData.isActive ? (
            <Button
              color="red"
              className="flex items-center"
              onClick={toggleSuspendUser}
            >
              Suspend User <MdDelete />
            </Button>
          ) : (
            <Button
              color="green"
              className="flex items-center"
              onClick={toggleSuspendUser}
            >
              Activate User <TiTick />
            </Button>
          )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AdminActions;
