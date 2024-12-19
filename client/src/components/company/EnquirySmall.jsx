import { Button, Modal, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useRef, useState } from "react";
import { setUser } from "../../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AuthModal from "../shared/AuthModal";

const EnquirySmall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [enquiry, setEnquiry] = useState("");

  const inputRef = useRef(null);

  const [opened, { open, close }] = useDisclosure();

  const { slug } = useParams();

  const sendEnquiry = async () => {
    if (!enquiry) {
      setError("Enquiry is required");
      return;
    } else setError(null);

    const id = notifications.show({
      title: "Sending enquiry...",
      message: "Please wait",
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/enquiries/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: enquiry,
            slug,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          notifications.update({
            id,
            title: "Unauthorized",
            message: data.message,
            color: "red",
            loading: false,
            autoClose: 2000,
          });
          open();
          return;
        }
        throw new Error(data.message);
      }
      notifications.update({
        id,
        title: "Enquiry sent",
        message: data.message,
        color: "teal",
        loading: false,
        autoClose: 2000,
      });
     
      setEnquiry("");
      dispatch(setUser(data.user));
      navigate(`/companies/${slug}`);
    } catch (error) {
      notifications.update({
        id,
        title: "Error",
        message: error.message,
        color: "red",
        loading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="w-full rounded-lg border flex flex-col items-center p-4 ">
      <div className="form flex flex-col w-full gap-4">
        <p className="heading !my-2">Send Enquiry</p>
        <Textarea
          rows={3}
          placeholder="Write an enquiry."
          value={enquiry}
          onChange={(e) => {
            setEnquiry(e.target.value);
            setError(null);
          }}
          className={`${error && "border-red-500 text-red-500"} w-full`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          color="brand.5"
          disabled={!enquiry}
          fullWidth
          onClick={sendEnquiry}
        >
          Send Enquiry
        </Button>

        {/* Auth Modal */}
        <Modal opened={opened} onClose={close} centered size="auto">
          <AuthModal close={close} />
        </Modal>
      </div>
    </div>
  );
};

export default EnquirySmall;
