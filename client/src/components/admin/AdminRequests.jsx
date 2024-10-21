import { Avatar, Badge, Button, Card, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { notifications } from "@mantine/notifications";

const AdminRequests = ({refetch, setRefetch}) => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async (action, companyId, companyName) => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
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
      setIsLoading(false);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/requests?page=${page}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          setIsLoading(false);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, [page, refetch]);

  return (
    <Card className="flex flex-col flex-1 max-h-[44vh]" withBorder>
      <ScrollArea h={400}>
        <div className="heading w-full border-l-8 border-teal-300 my-4 flex items-center">
          <div className="w-full pl-6 text-xl tracking-wide flex items-center gap-2">
            Pending Requests{" "}
            <p
              className={`cursor-pointer w-4 aspect-square rounded-full border-t-2 border-b-2 border-gray-600 ${isLoading && 'animate-spin'}`}
              onClick={() => setRefetch((prev) => !prev)}
            ></p>
          </div>
        </div>

        {results ? (
          results.companies.map((company, index) => {
            return (
              <div
                className={`userCard flex justify-between py-3 px-2 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
                key={index}
              >
                <Link
                  to={`/companies/${company.name.split(" ").join("-")}`}
                  className="flex items-center gap-2"
                >
                  <Avatar src={company?.logo} alt={company.name} />
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
          })
        ) : (
          <div>No Requests found</div>
        )}

        {(!results || !results.length) && <div>No Requests found</div>}

        {results?.totalPages > 1 && (
          <Pagination
            totalPages={results.totalPages}
            page={page}
            setPage={setPage}
          />
        )}
      </ScrollArea>
    </Card>
  );
};

export default AdminRequests;
