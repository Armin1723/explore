import { Button, Card } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from '@tiptap/extension-highlight';
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";


const DescriptionForm = ({ nextStep }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const form = useForm({
    initialValues: {
      description: "",
    },
    validate: {
      description: (value) =>
        value.length > 0 ? null : "Description is required",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: form.values.description,
    onUpdate: ({ editor }) => {
      form.setFieldValue("description", editor.getHTML());
    },
  });

  const handleDescription = async (values) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/${
          user.company._id
        }/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      dispatch(setUser(data.user));
      nextStep();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

return (
    <Card withBorder rounded="md" shadow="xl">
        <p className="text-2xl font-bold">
            Enter Description for {user.company.name}.
        </p>
        <form
            onSubmit={form.onSubmit(handleDescription)}
            className="flex flex-col gap-6 w-[90vw] md:w-[60vw] items-center"
        >
            <RichTextEditor
                editor={editor}
                className="w-full min-h-[30vh] flex flex-col gap-6"
            >
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
            <Button type="submit" color="brand.5" w="50%" disabled={!form.isValid()}>
                Next
            </Button>
        </form>
    </Card>
);
};

export default DescriptionForm;
