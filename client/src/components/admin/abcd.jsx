import { Button, Menu } from "@mantine/core";
import React from "react";

const SubCategoryMenu = ({ choices, setSubCategory, subCategory }) => {
  return (
    <Menu shadow="md">
      <Menu.Target> 
        <Button>
          {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {choices &&
          choices.map((choice) => {
            return (
              <Menu.Item key={choice} onClick={() => setSubCategory(choice)}>
                {choice.charAt(0).toUpperCase() + choice.slice(1)}
              </Menu.Item>
            );
          })}
        <Menu.Item onClick={() => setSubCategory("all")}>
            All
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SubCategoryMenu;
