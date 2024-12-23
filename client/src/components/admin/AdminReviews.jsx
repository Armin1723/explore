import { Avatar, Card } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineOutlinedFlag } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";

const AdminReviews = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("An error occurred while deleting review");
      }
      const data = await response.json();
      setRefetch((prev) => !prev);
      notifications.clean();
      notifications.show({
        title: "Review Deleted",
        message: "Review has been successfully deleted",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews?page=${page}`,
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
    fetchReviews();
  }, [page, refetch]);

  return (
    <Card className="flex flex-col flex-1 " withBorder>
        <div className="heading w-full border-l-4 border-primary my-4 ">
          <p className="w-full pl-6 text-xl tracking-wide">
            Most Flagged Reviews
          </p>
        </div>

        {loading && (
          <div className="w-full min-h-[40vh] flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}

        <div className="reviews-container min-h-[50px] max-h-[400px] overflow-y-auto flex flex-col">
          {results &&
            results.reviews.map((review, index) => {
              return (
                <div
                  key={index}
                  className={`userCard flex flex-col py-3 px-2 border-b border-gray-400/40 hover:bg-teal-100/20 ${
                    index === 0 && "border-t"
                  }`}
                >
                  <div className="flex justify-between items-center capitalize py-2 text-lg max-sm:text-sm px-2 rounded-md my-2 w-full">
                    <Link
                      to={`/companies/${review.company.slug}?reviewId=${review._id}`}
                    >
                      <span className="font-semibold">Review:</span>{" "}
                      {review.comment.split(" ").slice(0, 10).join(" ")}
                      ...
                    </Link>
                    <div className="flex items-center gap-3">
                      <div className="flag flex items-center gap-1">
                        <MdOutlineOutlinedFlag /> <p>:</p>{" "}
                        <p>{review.flags.length}</p>
                      </div>
                      <div className="p-1 rounded-full  transition-all duration-300 cursor-pointer">
                        <MdDelete
                          size={20}
                          className="fill-red-600 hover:fill-red-500 hover:scale-110 transition-all duration-300"
                          onClick={() => deleteReview(review._id)}
                        />
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/users/${review.user._id}`}
                    className="userCard flex justify-between w-full py-2 px-2 rounded-sm"
                  >
                    <div className="flex items-center gap-8 max-sm:gap-4 ">
                      <Avatar
                        src={review.user?.profilePic}
                        alt={review.user.name}
                        className="border border-black"
                      />
                      <p className="capitalize font-semibold">
                        {review.user.name}
                      </p>
                    </div>
                    <div className="flex items-center text-xs">
                      <p>
                        <span className="max-sm:hidden">Reviewed at: </span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>

        {results && results.length == 0 ? (
          <div>No Reviews found</div>
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

export default AdminReviews;
