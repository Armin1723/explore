import { Avatar, Card } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";

const AdminUsers = () => {
  const [refetch, setRefetch] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAdminUsers();
  }, [page, refetch]);

  return (
    <Card className="flex flex-col flex-1" withBorder>
      <div className="heading w-full border-l-4 border-primary my-4 ">
        <p className="w-full pl-6 text-xl tracking-wide">Recent Users</p>
      </div>

      {loading && (
        <div className="w-full min-h-[40vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      <div className="users-container min-h-[50px] max-h-[600px overflow-y-auto flex flex-col">
        {results &&
          results?.users.map((user, index) => {
            return (
              <Link
                to={`/users/${user?._id}`}
                className={`userCard flex justify-between py-3 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
                key={index}
              >
                <div className="flex items-center gap-8">
                  <Avatar
                    src={user?.profilePic}
                    alt={user?.name}
                    className="border border-black"
                  />
                  <p className="capitalize sub-heading">
                    {user?.name}
                  </p>
                </div>
                <div className="flex items-center">
                  <p>
                    Joined: {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>

      {results && results?.users.length === 0 ? (
        <p className="py-2">No users found</p>
      ) : (
        <Pagination
          totalPages={results?.totalPages}
          page={page}
          setPage={setPage}
        />
      )}
    </Card>
  );
};

export default AdminUsers;
