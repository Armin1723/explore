import { Avatar, Button, Card, Pagination, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineOutlinedFlag } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminReviews = () => {
  const [results, setResults] = useState(null);
  const [page, setPage] = useState(1);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteReview = async (reviewId) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, [page, refetch]);

  return (
    <Card className="flex flex-col flex-1 " withBorder>
      <ScrollArea h={400}>
        <div className="heading w-full border-l-4 border-primary my-4 ">
          <p className="w-full pl-6 text-xl tracking-wide">
            Most Flagged Reviews
          </p>
        </div>

        {loading && (
          <div className="w-full min-h-[40vh] flex items-center justify-center">
          <div className="loader"></div>
        </div>)}

        {results && (
          results.reviews.map((review, index) => {
            return (
              <div
                key={index}
                className={`userCard flex flex-col py-3 px-2 border-b border-gray-400 hover:bg-teal-100/20 ${
                  index === 0 && "border-t"
                }`}
              >
                <div className="flex justify-between items-center capitalize py-2 text-lg max-sm:text-sm bg-gray-100/40 px-2 rounded-md my-2 w-full">
                  <Link
                    to={`/companies/${review.company.name
                      .split(" ")
                      .join("-")}?reviewId=${review._id}`}
                  >
                    <span className="font-semibold">Review:</span>{" "}
                    {review.comment.split(" ").slice(0, 10).join(" ")}
                    ...
                  </Link>
                  <div className="flex items-center">
                    <MdOutlineOutlinedFlag /> : {review.flags.length}
                    <Button className="!px-1 mx-2" color="red.7">
                      <MdDelete
                        size={24}
                        onClick={() => deleteReview(review._id)}
                      />
                    </Button>
                  </div>
                </div>
                <Link
                  to={`/users/${review.user._id}`}
                  className="userCard flex justify-between w-full"
                >
                  <div className="flex items-center gap-8 max-sm:gap-4">
                    <Avatar
                      src={review.user?.profilePic}
                      alt={review.user.name}
                    />
                    <p className="capitalize font-semibold">
                      {review.user.name}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p>
                      <span className="max-sm:hidden">Reviewed at:{" "}</span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        )}

        {(results && results.length == 0) && <div>No Reviews found</div>}

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

export default AdminReviews;
