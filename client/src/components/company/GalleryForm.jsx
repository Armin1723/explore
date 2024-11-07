import React, { useEffect, useState } from "react";
import { Button, Card, filterProps, Image, rem, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Carousel } from "@mantine/carousel";
import { notifications } from "@mantine/notifications";
import { FaCross, FaUpload } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

const GalleryForm = ({ nextStep }) => {
  const [files, setFiles] = useState([]);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const form = useForm({
    initialValues: {
      gallery: [],
    },
    validate: {
      gallery: (value) =>
        value.length > 0 && value.length <= 5
          ? null
          : "You must upload between 1 and 5 images",
    },
  });

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length + files.length > 5) {
      notifications.show({
        title: "Error",
        message: "You can only upload up to 5 images.",
        color: "red",
      });
      return;
    }
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prev) => [...prev, ...newFiles]);
    form.setFieldValue("gallery", [...files, ...newFiles]);
  };

  const removeImage = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    form.setFieldValue("gallery", newFiles);
  };

  const handleSubmit = async (values) => {

    const id = notifications.show({
        id: "Register",
        title: "Uploading Images",
        message: "Please wait...",
        loading: true,
        withCloseButton: false,
        autoClose: false,
        });

    try {
      const formData = new FormData();
      values.gallery.forEach((file) => {
        formData.append("gallery", file);
      });
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/${
          user.company._id
        }/edit?edit=true`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      dispatch(setUser(data.user));
      nextStep();
      notifications.update({
        id,
        title: "Images uploaded successfully",
        message: data.message,
        color: "teal",
        loading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
        notifications.update({
            id,
            title: "Error",
            message: error.message,
            color: "red",
            loading: false,
            autoClose: 2000,
        });
    }
  };

return (
    <div className="w-fit p-20 max-lg:p-10 max-sm:p-2 flex flex-col gap-4 rounded-lg border bg-white">
        <p className="text-2xl font-bold">Upload Gallery Images</p>
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex flex-col gap-6 items-center max-sm:w-[80vw]"
        >
            <Dropzone
                onDrop={(files) => handleDrop(files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                className="flex flex-col items-center justify-center gap-4 w-full md:p-10 border-2 border-dashed border-gray-300 rounded-lg"
            >
                <Dropzone.Accept>
                    <FaUpload
                        style={{
                            // width: rem(52),
                            height: rem(52),
                            color: "var(--mantine-color-blue-6)",
                            alignSelf: "center",
                            width: '100%'
                        }}
                        stroke={1.5}
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <FaCross
                        style={{
                            // width: rem(52),
                            height: rem(52),
                            color: "var(--mantine-color-red-6)",
                            alignSelf: "center",
                            width: '100%'
                        }}
                        stroke={1.5}
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <MdPhoto
                        style={{
                            // width: rem(52),
                            height: rem(52),
                            color: "var(--mantine-color-dimmed)",
                            alignSelf: "center",
                            width: '100%'
                        }}
                        stroke={1.5}
                    />
                </Dropzone.Idle>

                <div className='flex flex-col items-center text-center'>
                    <Text size="xl" inline>
                        Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not exceed 5mb
                    </Text>
                </div>
            </Dropzone>

            {files.length > 0 && (
                <Carousel
                    slideSize={{ base: "100%", sm: "50%", md: "50%" }}
                    slideGap={{ base: "xl", sm: "md" }}
                    height={200}
                    align="start"
                    loop
                    className="w-full"
                >
                    {files.map((file, index) => (
                        <Carousel.Slide key={index}>
                            <Image
                                src={file.preview}
                                alt={`Preview ${index + 1}`}
                                withPlaceholder
                                height={200}
                                className="aspect-video !rounded-md"
                                onClick={() => removeImage(file)}
                                fit="cover"
                            />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            )}

            <Button type="submit" color="primary.3" fullWidth disabled={files.length === 0}>
                Finish
            </Button>
        </form>
    </div>
);
};

export default GalleryForm;
