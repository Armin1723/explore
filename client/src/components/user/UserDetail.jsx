import { Avatar, Badge, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CompanyCardSmall from "../company/CompanyCardSmall";
import SavedListings from "./SavedListings";
import ReviewedListings from "./ReviewedListings";

const UserDetail = () => {
  const { id } = useParams();
  
  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [self, setSelf] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user && user._id === id) {
          setUserData(user);
          // console.log(userData)
          setLoading(false);
          setSelf(true);
        } else {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`,
            {
              credentials: "include",
            }
          );
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
          }
          const data = await response.json();
          setUserData(data.user);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [user, id]);

  if (loading) {
    return (
      <div className="w-[80%] max-sm:w-[90%] bg-white h-full pt-[8vh] flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="w-[80%] max-sm:w-[95%] bg-white h-full pt-[8vh] border shadow-[0_0_20px_black] shadow-black/20 py-6 px-12 max-lg:px-6 max-sm:px-4 overflow-x-hidden">
      <ScrollArea
        h={600}
        scrollbars="y"
        className=""
      >
        <div className="profile flex justify-start items-center px-4 gap-4 max-sm:gap-2 py-6 w-full bg-secondary my-6 ">
          <div className="avatar flex flex-col justify-center h-full">
            <Avatar
              size={100}
              src={userData?.profilePic}
              className="border-2 shadow-xl "
            />
          </div>
          <div className="creds flex flex-col justify-start h-full">
            <div className="top flex gap-2 items-center max-sm:flex-col max-sm:items-start max-sm:gap-0">
              <p className="heading !my-0">{userData?.name}</p>
              <Badge bg={userData?.role == "admin" ? "green.9" : "blue.9"}>
                {userData?.role}
              </Badge>
            </div>
            <p className="text-gray-800 max-sm:text-sm">{userData?.email}</p>
            <p className="text-gray-800 max-sm:text-sm">{userData?.phone}</p>
            <p className="text-gray-600 text-xs italic">
              Joined: {new Date(userData?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="listing my-6 flex flex-col">
          <p className="text-lg font-bold my-4 capitalize pl-8 max-sm:pl-6 border-l-4 border-l-primary">
            {userData?.name}'s Listing:
          </p>
          {userData?.company ? (
            <CompanyCardSmall company={userData?.company} self={self} />
          ) : (
            <p>No company listed as of now .</p>
          )}
        </div>

        <SavedListings user={userData}/>

        <ReviewedListings user={userData}/>
      </ScrollArea>
    </div>
  );
};

export default UserDetail;
