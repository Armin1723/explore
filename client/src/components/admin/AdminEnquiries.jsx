import { Card, useMantineColorScheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";
import EnquiryActionButton from "./EnquiryActionButton";

const AdminEnquiries = () => {
  const [refetch, setRefetch] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const { colorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  useEffect(() => {
    const fetchAdminEnquiries = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/enquiries?page=${page}${status && `&status=${status}`}`,
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
    fetchAdminEnquiries();
  }, [page, refetch, status]);

  return (
    <Card className="flex flex-col flex-1" withBorder>
      <div className="heading w-full border-l-4 border-primary my-4 flex items-center gap-2">
        <p className="pl-6 text-xl tracking-wide">Recent Enquiries</p>
        <div
          className={`w-4 aspect-square border-b-2 border-t-2 border-neutral-500 rounded-full cursor-pointer ${
            loading && "animate-spin"
          }`}
          onClick={() => setRefetch(!refetch)}
        />
      </div>

      {loading ? (
        <div className="w-full min-h-[40vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="enquiry-container min-h-[50px] overflow-y-auto flex flex-col flex-1">
          <div className="w-full h-full overflow-x-auto">
            <div className="table h-full min-w-full max-sm:min-w-[600px] max-sm:text-sm">
              {/* Header */}
              <div
                className={`table-row items-center table-header sticky top-0 py-2 font-semibold ${
                  colorScheme === "dark" ? "bg-zinc-800" : "bg-secondary"
                } px-2`}
              >
                <div className="table-cell align-middle">User</div>
                <div className="table-cell align-middle">Company</div>
                <div className="table-cell align-middle">Message</div>
                <div className="table-cell align-middle">Date</div>
                <div className="table-cell align-middle">Actions</div>
              </div>

              {/* Body */}
              <div className="table-row-group flex-1 px-2 ">
                {results && results.enquiries?.length ? (
                  results?.enquiries.map((enquiry, index) => (
                    <div
                      className={`table-row py-3 border-b border-neutral-400/50 hover:bg-teal-100/20 ${
                        index === 0 && "border-t"
                      }`}
                      key={index}
                    >
                      <Link
                        to={`/users/${enquiry?.user?._id}`}
                        className="table-cell align-middle hover:-translate-y-1 transition-all duration-200 ease-in"
                      >
                        {enquiry?.user?.name}
                      </Link>
                      <Link
                        to={`/companies/${enquiry?.company?.slug}`}
                        className="table-cell align-middle hover:-translate-y-1 transition-all duration-200 ease-in"
                      >
                        {enquiry?.company?.name}
                      </Link>
                      <div className="table-cell align-middle truncate text-ellipsis">
                        {enquiry?.message}
                      </div>
                      <div className="table-cell align-middle">
                        {new Date(enquiry?.createdAt).toLocaleDateString()}
                      </div>
                      <div className="table-cell align-middle">
                        <EnquiryActionButton
                          enquiry={enquiry}
                          setRefetch={setRefetch}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex items-center justify-start h-full">
                    <p>No enquiries found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="table-footer w-full flex items-center justify-center sticky bottom-0 left-1/2 -translate-x-1/2 top-full ">
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={results?.totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AdminEnquiries;
