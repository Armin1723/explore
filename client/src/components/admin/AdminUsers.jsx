import { Avatar, Card, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";
import { notifications } from "@mantine/notifications";
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {withCredentials: true});

const AdminUsers = () => {
  const [refetch, setRefetch] = useState(false);
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/users?page=${page}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdminUsers();

    socket.on('newUser', (newUser) => {
      setResults((prevResults) => {
        return {
          ...prevResults,
          users: [newUser, ...prevResults.users],
        };
      });
      notifications.show({
        title: 'New User',
        message: `${newUser.name} has registered`,
      })
      setRefetch(prev => !prev);
    });

    return () => {
      socket.off('newUser');
    };
  }, [page, refetch]);

  return (
    <Card className="flex flex-col flex-1 max-h-[44vh]" withBorder>
      <ScrollArea h={400}>
        <div className="heading w-full border-l-8 border-teal-300 my-4 ">
          <p className="w-full pl-6 text-xl tracking-wide">Recent Users</p>
        </div>
        {results ? (
          results.users.map((user, index) => {
            return (
              <Link
                to={`/users/${user._id}`}
                className={`userCard flex justify-between py-3 px-12 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
                key={index}
              >
                <div className="flex items-center gap-8">
                  <Avatar src={user?.profilePic} alt={user.name} />
                  <p className="capitalize font-semibold">{user.name}</p>
                </div>
                <div className="flex items-center">
                  <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div>No users found</div>
        )}   

        {(results?.totalPages > 1 ) && <Pagination totalPages={results.totalPages} page={page} setPage={setPage}/>}
    
      </ScrollArea>
    </Card>
  );
};

export default AdminUsers;
