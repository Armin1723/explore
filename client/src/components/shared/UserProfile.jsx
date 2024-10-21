import {
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { FaChevronDown, FaHeart, FaStar, FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import classes from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import { TiThListOutline } from "react-icons/ti";
import { notifications } from "@mantine/notifications";
import { setUser } from "../../redux/features/user/userSlice";

const UserProfile = () => {
  const user = useSelector((state) => state.user) || null;
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();
  const dispatch = useDispatch();

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
        dispatch(setUser(null));
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
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={`${classes.user} ${
            userMenuOpened ? classes.userActive : ""
          }`}
        >
          <Group gap={7}>
            <Link to={`/users/${user._id}`} className="flex gap-2 items-center">
              <Avatar
                src={user.profilePic}
                alt={user.name}
                radius="xl"
                size={20}
              />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.name}
              </Text>
            </Link>
            <FaChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Link to={`/users/${user._id}/saved`}>
          <Menu.Item
            leftSection={
              <FaStar
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Saved.
          </Menu.Item>
        </Link>
        <Link to={`/users/${user._id}/reviewed`}>
          <Menu.Item
            leftSection={
              <TiThListOutline
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.yellow[6]}
              />
            }
          >
            Reviewed.
          </Menu.Item>
        </Link>

        <Menu.Label>Profile</Menu.Label>

        <Link to={`/users/${user._id}`}>
          <Menu.Item
            leftSection={
              <FaUser
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
          >
            View Profile
          </Menu.Item>
        </Link>
        <Menu.Item
          onClick={handleLogout}
          leftSection={
            <MdLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserProfile;
