import { Avatar, Button, Card } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { notifications } from "@mantine/notifications";

const AdminRequests = ({ refetch, setRefetch }) => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRequest = async (action, companyId, companyName) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/requests/handle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            action,
            companyId,
          }),
        }
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error("An error occurred while handling request");
      }
      const data = await response.json();
      notifications.clean();
      notifications.show({
        title: "Request handled",
        message: `Request for ${companyName} has been ${
          action === "approve" ? "approved" : "rejected"
        }`,
      });
      setLoading(false);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/requests?page=${page}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          setLoading(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, [page, refetch]);

  return (
    <Card className="flex flex-col flex-1" withBorder>
        <div className="heading w-full border-l-4 border-primary my-4 flex items-center">
          <div className="w-full pl-6 text-xl tracking-wide flex items-center gap-2">
            Pending Requests{" "}
            <p
              className={`cursor-pointer w-4 aspect-square rounded-full border-t-2 border-b-2 border-gray-600 ${
                loading && "animate-spin"
              }`}
              onClick={() => setRefetch((prev) => !prev)}
            ></p>
          </div>
        </div>

        {loading && (
          <div className="w-full min-h-[40vh] flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}

        <div className="users-container min-h-[50px] max-h-[600px] overflow-y-auto flex flex-col">
          {results &&
            results.companies.map((company, index) => {
              return (
                <div
                  className={`userCard flex justify-between py-3 px-2 border-b border-gray-400/40 hover:bg-teal-100/20 ${
                    index === 0 && "border-t"
                  }`}
                  key={index}
                >
                  <Link
                    to={`/companies/${company?.slug}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar src={company?.logo.url} alt={company.name} />
                    <p className="capitalize font-semibold">{company.name}</p>
                  </Link>
                  <div className="flex items-center">
                    <p>
                      Joined: {new Date(company.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      color="green.7"
                      className="!p-1 !px-2 rounded-xl"
                      onClick={() =>
                        handleRequest("approve", company._id, company.name)
                      }
                    >
                      <TiTick /> Approve
                    </Button>
                    <Button
                      color="red.7"
                      className="!p-1 !px-2 rounded-xl"
                      onClick={() =>
                        handleRequest("reject", company._id, company.name)
                      }
                    >
                      <RxCross2 /> Reject
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>

        {results && results.companies.length === 0 ? (
          <p className="my-2">No requests found</p>
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

export default AdminRequests;
