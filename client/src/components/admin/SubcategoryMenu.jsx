import { Button, Menu } from "@mantine/core";
import React from "react";

const SubcategoryMenu = ({ choices, setSubcategory, subcategory }) => {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button>
          {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {choices &&
          choices.map((choice) => {
            return (
              <Menu.Item key={choice} onClick={() => setSubcategory(choice)}>
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </Menu.Item>
            );
          })}
        <Menu.Item onClick={() => setSubcategory("all")}>
            All
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SubcategoryMenu;
