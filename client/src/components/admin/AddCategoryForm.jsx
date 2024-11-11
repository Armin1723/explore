import {
    Button,
    Card,
    ScrollArea,
    Textarea,
    TextInput,
    Chip,
    Group,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
  import { useState } from "react";
import { useNavigate } from "react-router-dom";
  
  const AddCategoryForm = () => {
    const [subCategoryInput, setSubCategoryInput] = useState("");
    const [subCategories, setSubCategories] = useState([]);

    const navigate = useNavigate();
  
    const form = useForm({
      initialValues: {
        name: "",
        description: "",
      },
  
      validate: {
        name: (value) => (value.length > 0 ? null : "Name is required"),
        subCategories: (value) =>
          subCategories.length > 0 ? null : "Sub Categories are required",
      },
    });
  
    const handleAddSubCategory = () => {
      if (subCategoryInput && !subCategories.includes(subCategoryInput)) {
        setSubCategories([...subCategories, subCategoryInput]);
        setSubCategoryInput("");
      }
    };
  
    const handleDeleteSubCategory = (subcategory) => {
      setSubCategories(subCategories.filter((item) => item !== subcategory));
    };
  
    const handleAddCategory = async (values) => {
      try {
        const id = notifications.show({
            title: "Adding Category...",
            message: "Please wait",
            loading: true,
            autoClose: false,
            withCloseButton: false,
        });
        const { name, description } = values;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description, subCategories }),
            credentials: "include",
          }
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
        const data = await response.json();
        notifications.update({
            id,
            title: "Category Added",
            message: "Category has been added successfully",
            loading: false,
            autoClose: true,
            withCloseButton: true,
            });
        navigate("/admin/categories");
      } catch (error) {
        console.error(error);
        notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
            autoClose: false,
            withCloseButton: true,
        });
      }
    };
  
    return (
      <Card className="flex flex-col flex-1 font-['inter'] " withBorder>
        <ScrollArea
        offsetScrollbars
        scrollbarSize={6}
        scrollHideDelay={500} h={800}>
          <div className="heading w-full border-l-4 border-primary my-4 flex items-center justify-start gap-2">
            <p className="pl-6 text-xl tracking-wide">Add Category</p>
          </div>
          <form onSubmit={form.onSubmit(handleAddCategory)}>
            <div className="flex flex-col gap-6 p-4 pt-2">
              <TextInput
                withAsterisk
                label="Category Name"
                placeholder="Category Name"
                {...form.getInputProps("name")}
                className="input"
              />
              <Textarea
                rows={4}
                label="Category Description"
                placeholder="Category Description"
                {...form.getInputProps("description")}
                className="input"
              />
              <TextInput
                label="Sub Categories"
                placeholder="Type and press Enter"
                value={subCategoryInput}
                onChange={(e) => setSubCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubCategory();
                  }
                }}
              />
              <Group spacing="xs">
                {subCategories.map((subcategory, index) => (
                  <Chip
                    key={index}
                    checked
                    onClick={() => handleDeleteSubCategory(subcategory)}
                  >
                    {subcategory}
                  </Chip>
                ))}
              </Group>
              <Button type="submit" color='primary.3'>
                Add Category
              </Button>
            </div>
          </form>
        </ScrollArea>
      </Card>
    );
  };
  
  export default AddCategoryForm;
  