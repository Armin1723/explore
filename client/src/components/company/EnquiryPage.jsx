import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import Pagination from "../shared/Pagination";
import EnquiryCard from "./EnquiryCard";
import { FaArrowLeft } from "react-icons/fa";

const EnquiryPage = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const user = useSelector((state) => state.user);
  const { slug } = useParams();

  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  //Check if user exists and has access to view this page.
  useEffect(() => {
    if (!user || !(user?.company?.slug == slug)) {
      notifications.show({
        title: "Error",
        message: "You are not allowed to view this page.",
        color: "red",
      });
      navigate(`/companies/${slug}`);
    }
  }, [user, refetch]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setLoading(true);
        setResults([]);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/enquiries/${
            user?.company?._id
          }?page=${page}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setResults(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };

    fetchEnquiries();
  }, [refetch, page]);

  return (
    <div className="flex flex-col items-center relative overflow-hidden w-screen h-[100dvh]">
      <motion.img
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: "linear",
        }}
        src="/backgrounds/login-bg.svg"
        alt="ok"
        className="absolute bottom-0 left-0 min-h-[90dvh] w-screen z-[-2] object-cover max-sm:aspect-[1/1.4] "
      />
      <div
        className="form-container flex flex-col items-center justify-center h-full"
      >
        
        <ScrollArea
        offsetScrollbars
        scrollbarSize={6}
        scrollHideDelay={500}
        shadow="xs"
        padding="lg"
        className=" shadow-sm p-8 max-sm:p-4 bg-white w-screen h-full max-w-screen-lg flex flex-col border rounded-lg border-black/30"
        >
          {/* Back to listing button */}
          <div onClick={navigateBack} className="cursor-pointer hover:opacity-80 transition-all duration-300 flex items-center gap-3 px-3 hover:bg-brand/10 w-fit rounded-lg py-1">
            <span><FaArrowLeft/></span>
            <p>Go back</p>
          </div>

          <div className="flex items-center gap-2 pl-6 border-l-4 border-primary my-4">
            <p className="heading !my-2">View Enquiries</p>
            <span className={` border-t-2 border-b-2 rounded-full w-4 aspect-square border-black cursor-pointer ${loading && 'animate-spin'}`} onClick={()=>setRefetch(prev => !prev)}></span>
          </div>
          <p className="text-sm text-gray-700">You have {results?.totalEnquiries ?? 0} unattended enquiries</p>

          <div className="enquiries-container flex flex-col gap-6 my-4">
            {loading && <div className="flex items-center justify-center w-full min-h-[50vh]"><div className="loader"></div></div>}
            {results?.enquiries?.length > 0 && results.enquiries.map((enquiry) => {
                return(
                    <EnquiryCard enquiry={enquiry} setRefetch={setRefetch} key={enquiry._id}/>
                )
            })}
          </div>

          {results?.totalPages > 1 && (
            <Pagination
              totalPages={results?.totalPages}
              page={page}
              setPage={setPage}
            />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default EnquiryPage;
