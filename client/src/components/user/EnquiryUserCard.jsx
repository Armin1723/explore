import { Avatar } from "@mantine/core";
import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const EnquiryUserCard = ({ enquiry, setRefetch }) => {
  const markAsRead = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/enquiries/mark-as-read`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            enquiryId: enquiry._id,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-secondary p-4 rounded-lg border border-neutral-500/30 shadowmd my-1 flex flex-col mx-4">
      <div className="details flex justify-between max-sm:flex-col max-sm:gap-2">
        <Link
          to={`/users/${enquiry?.user?._id}`}
          className="user-details flex items-center gap-2 capitalize"
        >
          <Avatar
            size={40}
            src={enquiry?.company?.logo?.url}
            className="border border-black"
          />
          <div className="flex flex-col">
            <Link
              to={`/companies/${enquiry?.company?.slug}`}
              className="sub-heading"
            >
              {enquiry?.company?.name}
            </Link>
          </div>
        </Link>
        <div className="actions flex items-center gap-2 max-sm:pl-4 max-sm:gap-4 text-white">
          <button
            className="px-2 py-1 text-sm bg-gradient-to-br from-blue-700/60 to-blue-800 hover:bg-gradient-to-r flex items-center rounded-md border border-black/30"
            onClick={markAsRead}
          >
            <TiTick className="text-xl" />{" "}
            <span className="max-sm:hidde">Mark Read</span>
          </button>
        </div>
      </div>
      <div className="main-enquiry flex w-full flex-col p-4">
        <div className="flex p-4 bg-white/75 rounded-md border flex-1 flex-col gap-2">
          <p className=" text-sm ">{enquiry?.message}</p>
          <p className="text-xs italic text-gray-400">
            {enquiry?.createdAt
              ? new Date(enquiry.createdAt).toLocaleDateString() +
                " " +
                new Date(enquiry.createdAt).toLocaleTimeString()
              : "N/A"}
          </p>
        </div>

        {enquiry && enquiry.response ? (
        <>
        <div className="h-12 border-l translate-x-8 border-neutral-500/50 relative" />

        <div className="reply-box flex gap-2 w-full text-sm p-4 bg-white/75 rounded-md border">
          {enquiry.response}
        </div>
      </>
      ) : (
          <p className="text-xs italic text-gray-400 p-4">
          No response yet.
        </p>
      )}
      </div>
    </div>
  );
};

export default EnquiryUserCard;
