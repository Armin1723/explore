import { Avatar, Button, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const EnquiryCard = ({ enquiry, setRefetch }) => {
  const [replyBoxOpen, setReplyBoxOpen] = React.useState(false);
  const [reply, setReply] = React.useState("");

    const markAsRead = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/enquiries/mark-read`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    enquiryId: enquiry._id,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setRefetch((prev) => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }

    const deleteEnquiry = async () => {
        try {
            const deleteNotif = notifications.show({
                title: "Deleting Enquiry...",
                message: "Please wait",
                loading: true,
                autoClose: false,
                withCloseButton: false,
            });
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/enquiries/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    enquiryId: enquiry._id,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                notifications.update({
                    id: deleteNotif,
                    title: "Error",
                    message: data.message,
                    color: "red",
                    autoClose: 3000,
                    loading: false,
                });
                throw new Error(data.message);
            }
            setRefetch((prev) => !prev);
            notifications.update({
                id: deleteNotif,
                title: "Enquiry Deleted",
                message: data.message,
                color: "teal",
                autoClose: 2000,
                loading: false,
            });
        } catch(error) {
            console.error(error.message);
        }
    }

  const sendReply = async () => {
    try{
        const id = notifications.show({
            title: "Sending Reply...",
            message: "Please wait",
            loading: true,
            autoClose: false,
            withCloseButton: false,
        });
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/enquiries/reply`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                enquiryId: enquiry._id,
                response: reply,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        notifications.update({
            id,
            title: "Reply Sent",
            message: data.message,
            color: "teal",
            autoClose: 2000,    
            loading: false,
            });
        setReplyBoxOpen(false);
        setReply("");
        setRefetch((prev) => !prev);    
    }
    catch(error){
        notifications.update({
            title: "Error",
            message: error.message,
            color: "red",
            autoClose: 3000,
            loading: false,
            });
      console.error(error.message)
    }
}

  return (
    <div className="bg-secondary p-4 rounded-lg border border-black/50 shadowmd my-1 flex flex-col hover:border-accent/60 hover:shadow-[0_0_20px_orange] !shadow-accent/30 mx-4">
      <div className="details flex justify-between max-sm:flex-col max-sm:gap-2">
        <Link
          to={`/users/${enquiry?.user?._id}`}
          className="user-details flex items-center gap-2 capitalize"
        >
          <Avatar
            size={40}
            src={enquiry?.user?.profilePic}
            className="border border-black"
          />
          <div className="flex flex-col">
            <p className="sub-heading">{enquiry?.user?.name}</p>
            <p className="text-xs italic text-gray-400">
              {enquiry?.createdAt
                ? new Date(enquiry.createdAt).toLocaleDateString() +
                  " " +
                  new Date(enquiry.createdAt).toLocaleTimeString()
                : "N/A"}
            </p>
          </div>
        </Link>
        <div className="actions flex items-center gap-2 max-sm:pl-4 max-sm:gap-4 text-white">
          <button className="px-2 py-1 text-sm bg-gradient-to-br from-blue-700/60 to-blue-800 hover:bg-gradient-to-r flex items-center rounded-md border border-black/30" onClick={markAsRead}>
            <TiTick className="text-xl"/> <span className="max-sm:hidde">Mark Read</span>
          </button>
          <button className="px-2 py-1 text-sm bg-gradient-to-br from-red-600/90 to-red-600 hover:bg-gradient-to-r flex items-center rounded-md border border-black/30" onClick={deleteEnquiry}>
            <MdDelete /> <span className="">Delete</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 my-2">
        <p className="p-4 bg-white/75 text-sm rounded-lg border my-2 flex-1">
          {enquiry?.message}
        </p>
      </div>

      {replyBoxOpen ? (
        <p className="text-blue-500 hover:text-blue-700 transition-all duration-150 text-xs pl-4 italic cursor-pointer my-2" onClick={()=> setReplyBoxOpen(false)}>
          Close reply box. 
        </p>
      ) : (
        <p className="text-blue-500 hover:text-blue-700 transition-all duration-150 text-xs pl-4 italic cursor-pointer my-2" onClick={()=> setReplyBoxOpen(true)}>
          Send Reply?
        </p>
      )}

      {replyBoxOpen && (
        <div className="reply-box flex flex-col gap-2 items-center w-full">
          <Textarea
            value={reply}
            rows={5}
            onChange={(e) => setReply(e.target.value)}
            className="p-2 rounded-lg flex-1 w-full relative"
            placeholder="Type your reply here..."
          >
          </Textarea>
            <Button variant="filled" disabled={reply.length < 1} fullWidth mx='lg' className="flex items-center gap-4" onClick={sendReply}>
                <p>Send Reply</p> <IoIosSend />
            </Button>
        </div>
      )}
    </div>
  );
};

export default EnquiryCard;
