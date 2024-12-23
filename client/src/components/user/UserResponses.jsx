import React, { useEffect, useRef, useState } from "react";
import { SiGooglemessages } from "react-icons/si";
import { useSelector } from "react-redux";
import EnquiryUserCard from "./EnquiryUserCard";
import Pagination from "../shared/Pagination";
import { FaChevronDown } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const UserResponses = () => {
  const [responseModal, setResponseModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [type, setType] = useState("responses");

  const menuRef = useRef(null);

  const user = useSelector((state) => state.user);

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

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${
            user._id
          }/enquiries?page=${page}&type=${type}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        } else setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserResponses();
  }, [refetch, page, type]);
  
  return (
    <div className="relative">
      <div className="responses relative">
        <SiGooglemessages
          onClick={() => setResponseModal((p) => !p)}
          className="cursor-pointer text-xl"
        />
        {data?.enquiries?.length > 0 && (
          <div className="absolute bg-red-600 h-3 flex items-center justify-center text-[0.5rem] text-white rounded-full p-1 aspect-square right-0 top-0 translate-x-1/2 -translate-y-1/2">
            {data?.enquiries && data.enquiries.length}
          </div>
        )}
      </div>

      {responseModal && (
        <div className="fixed inset-0 h-screen w-screen bg-gray-500/40 bg-opacity-90 z-[999] flex items-center justify-center">
          <div className="w-3/4 max-sm:w-[90%] min-h-[60vh] bg-secondary p-3 rounded-md border border-neutral-500/30 shadow-md flex flex-col">
            <div className="title w-full flex justify-between p-4">
              <div className="title-left flex items-center gap-2">
                <p className="text-xl font-bold">
                  {type === "responses" ? "Responses" : "All Enquiries"}
                </p>
                <div className="menu relative" ref={menuRef}>
                  <div
                    onClick={() => setMenuOpen((prev) => !prev)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setMenuOpen((prev) => !prev);
                    }}
                    className="button-title relative text-sm flex gap-2 items-center transition-all duration-300 ease-in capitalize rounded-md border border-neutral-500/50 px-3 py-1.5"
                    tabIndex={0}
                    role="button"
                    aria-expanded={menuOpen}
                    aria-haspopup="menu"
                  >
                    {type}
                    <FaChevronDown />
                  </div>
                  {/* Dropdown Menu */}
                  <div
                    className={`${
                      menuOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0"
                    } absolute menu bg-secondary overflow-hidden !z-[9999] top-full transition-all duration-300 ease-in min-w-[120px] rounded-md py-1 flex flex-col gap-2 border-neutral-500/50 border shadow-md`}
                    role="menu"
                    aria-hidden={!menuOpen}
                  >
                    <div
                      className="menu-item px-4 py-1 text-sm text-center hover:bg-accentDark/10 cursor-pointer transition-all duration-200 ease-in flex items-center gap-2"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => {
                        setType("all");
                        setMenuOpen(false);
                      }}
                    >
                      <p className="capitalize">All</p>
                    </div>
                    <div
                      className="menu-item px-4 py-1 text-sm text-center hover:bg-accentDark/10 cursor-pointer transition-all duration-200 ease-in flex items-center gap-2"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => {
                        setType("responses");
                        setMenuOpen(false);
                      }}
                    >
                      <p className="capitalize">Responses</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="title-right flex items-center justify-center px-3 py-1.5 rounded-md text-white bg-red-600 hover:bg-opacity-80 cursor-pointer"
                onClick={() => setResponseModal(false)}
              >
                <RxCross2 />
                <span className="max-sm:hidden">Close</span>
              </button>
            </div>

            <div className="px-4 my-2">
              You have {data?.enquiries?.length || 0}{" "}
              {type === "responses" ? type : "enquiries"}.
            </div>
            <div className="response-container px-4 flex flex-col w-full min-h-[30vh] max-h-[70vh] overflow-y-auto">
              <div className="responses flex flex-col gap-4">
                {data?.enquiries?.length > 0 &&
                  data?.enquiries?.map((enquiry, index) => (
                    <EnquiryUserCard
                      key={index}
                      enquiry={enquiry}
                      setRefetch={setRefetch}
                    />
                  ))}
              </div>
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={data?.totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserResponses;
