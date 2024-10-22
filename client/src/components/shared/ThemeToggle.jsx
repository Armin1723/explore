import { Button, Menu, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const { setColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true,
    });
  return (
    <div className="toggle-theme">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button color={`${colorScheme == 'dark' ? 'gray.9' : 'blue.3'}`} >
            <MdDarkMode />
            <p>/</p>
            <MdOutlineLightMode />
            <p className="pl-2 max-sm:hidden">Toggle</p>
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => setColorScheme("light")}
            leftSection={<MdOutlineLightMode />}
          >
            Light Theme
          </Menu.Item>
          <Menu.Item
            onClick={() => setColorScheme("dark")}
            leftSection={<MdDarkMode />}
          >
            Dark Theme
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default ThemeToggle;
