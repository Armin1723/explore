import { useMantineColorScheme } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaShare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IoMdSend } from "react-icons/io";

const EnquiryActionButton = ({ enquiry, setRefetch = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reply, setReply] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [replyModalOpen, setReplyModalOpen] = useState(false);

  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const sendResponse = async () => {
    const id = notifications.show({
      title: "Sending Response",
      message: "Please wait while response is sent.",
      loading: true,
    });
    try {
      // Send response to the server
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries/${
          enquiry._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            response: reply,
          }),
        }
      );

      if (response.ok) {
        setReplyModalOpen(false);
        setRefetch((prev) => !prev);
        notifications.update({
          id,
          title: "Response Sent",
          message: "The response has been sent successfully",
          color: "blue",
          loading: false,
          autoClose: 3000,
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
      notifications.update({
        id,
        title: "Error Sending Response",
        message: "An error occurred while sending the response",
        color: "red",
        loading: false,
        autoClose: 3000,
      });
    }
  };

  const forwardEnquiry = async () => {
    setMenuOpen(false);
    const id = notifications.show({
      title: "Forwarding Enquiry",
      message: "Please wait while enquiry is forwarded.",
      loading: true,
    });
    try {
      // Send response to the server
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/enquiries/${
          enquiry._id
        }/forward`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        setRefetch((prev) => !prev);
        const data = await response.json();
        notifications.update({
          id,
          title: "Enquiry Forwarded",
          message: `Enquiry forwrded to ${data.companyName}`,
          color: "blue",
          loading: false,
          autoClose: 3000,
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(error);
      notifications.update({
        id,
        title: "Error Forwarding Enquiry",
        message: "An error occurred while forwarding the enquiry",
        color: "red",
        loading: false,
        autoClose: 3000,
      });
    }
  };

  // Toggle menu visibility
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div
      ref={menuRef}
      className="relative flex items-center px-4 py-2 rounded-md gap-2 cursor-pointer "
    >
      {/* Button */}
      <div
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleMenu();
        }}
        className="button-title bg-[var(--color-card)] text-sm flex gap-2 items-center transition-all duration-300 ease-in rounded-md border border-neutral-500/50 px-3 py-1.5"
        tabIndex={0}
        role="button"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <HiDotsVertical />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } ${
          colorScheme === "dark" ? "bg-zinc-800" : "bg-white"
        } absolute menu overflow-hidden top-full -left-1/2 !z-[999] transition-all duration-300 ease-in min-w-[120px] rounded-md py-1 flex flex-col gap-2 border-neutral-500/50 border shadow-md`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <div
          className="menu-item px-4 py-1 text-sm text-center hover:bg-brand/10 cursor-pointer transition-all duration-200 ease-in flex items-center gap-2"
          role="menuitem"
          tabIndex={0}
          onClick={() => {
            setMenuOpen(false);
            setReplyModalOpen(true);
          }}
        >
          <FaEdit />
          <p className="capitalize">Respond</p>
        </div>

        <div
          className="menu-item px-4 py-1 text-sm text-center hover:bg-brand/10 cursor-pointer transition-all duration-200 ease-in flex items-center gap-2"
          role="menuitem"
          tabIndex={0}
          onClick={forwardEnquiry}
        >
          <FaShare />
          <p className="capitalize">Forward</p>
        </div>
      </div>

      {/* Response Modal */}
      {replyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
          <div
            className={` ${
              colorScheme === "dark" ? "bg-zinc-800" : "bg-white"
            } rounded-md p-6 w-1/2 max-sm:w-[90%] overflow-y-auto max-h-[90vh] max-sm:px-6`}
          >
            <div className="flex items-center gap-2 w-full justify-between my-4">
              <h2 className="text-lg font-bold ">Send Response</h2>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => setReplyModalOpen(false)}
              >
                Close
              </button>
            </div>
            {/* Modal Content for Response */}
            <div className="enquiry flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={enquiry?.message}
                  readOnly
                  className="input outline-none p-2 rounded-md border border-neutral-400"
                  placeholder="Type your response here..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold">
                  Response
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="input outline-none p-2 rounded-md border border-neutral-400"
                  placeholder="Type your response here..."
                />
              </div>
              <button
                onClick={sendResponse}
                className="flex justify-center items-center gap-2 py-1.5 w-full rounded-md bg-brand/60 text-white border border-brand hover:bg-brand/80 transition-all"
              >
                <p>Send</p>
                <IoMdSend />{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryActionButton;
