import { Avatar, Group, Menu, Paper, Rating, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";
import { FaFlag } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CompanyReview = ({ company, setCompany, isAdmin }) => {
  const [hasMore, setHasMore] = React.useState(
    company?.reviews?.length < 5 ? false : true
  );
  const [loading, setLoading] = React.useState(false);
  const user = useSelector((state) => state.user);

  const fetchMoreReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/company/review/all?skip=${company?.reviews?.length}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName : company?.name }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      setCompany((prev) => ({
        ...prev,
        reviews: [...prev.reviews, ...data.reviews],
      }));
      setHasMore(data.hasMore);
      setLoading(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
      setHasMore(error?.hasMore);
      setLoading(false);
    }
  };

  const flagReview = async (reviewId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/company/review/flag/${reviewId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      notifications.show({
        title: "Review flagged",
        message: data.message,
        color: "teal",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

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
      notifications.show({
        title: "Review Deleted",
        message: "Review has been successfully deleted",
      });
      setCompany((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((review) => review._id !== reviewId),
      }));
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  return (
    <div
      id="reviews"
      className="reviews flex flex-col items-start gap-4 md:w-4/5 w-full pt-4"
    >
      <div className="heading !my-4 pl-8 max-sm:pl-4 border-l-4 border-primary">
        Reviews
      </div>
      {company?.reviews?.slice(0, 10).map((review, index) => (
        <Paper
          key={index}
          withBorder
          className="p-4 mb-4 shadow-sm rounded-lg w-full"
        >
          <Group position="apart" justify="space-between">
            <Link to={`/users/${review?.user?._id}`} className="flex gap-2 items-center">
              <Avatar src={review?.user?.profilePic} alt={review?.user?.name} />
              <div>
                <Title order={5}>{review?.user?.name}</Title>
                <Rating value={review?.rating} readOnly size="sm" />
              </div>
              <div className="text-sm max-sm:text-xs h-full items-start ">
                {new Date(review?.createdAt).toLocaleDateString()}
              </div>
            </Link>

            <Menu shadow="md" width={200} className={(!user || !user.name) && 'hidden'}>
              <Menu.Target>
                <p>
                  <FaEllipsisV />
                </p>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => flagReview(review._id)}
                  leftSection={<FaFlag />}
                >
                  Flag Review
                </Menu.Item>
                {isAdmin && (
                  <Menu.Item
                    onClick={() => deleteReview(review._id)}
                    leftSection={<MdDelete />}
                  >
                    Delete Review
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
          <p className="mt-2 max-sm:text-xs">{review?.comment}</p>
        </Paper>
      ))}

      {hasMore && (
        <button
          onClick={fetchMoreReviews}
          className="bg-primary text-white px-4 rounded-lg w-36 hover:bg-primary/90 transition-all duration-200"
        >
          {loading ? (
            <span class="dots">
              <span class="dot">.</span>
              <span class="dot">.</span>
              <span class="dot">.</span>
            </span>
          ) : (
            <p className="py-2">Load More</p>
          )}
        </button>
      )}

      {company?.reviews?.length === 0 && (
        <p className="">No reviews found</p>
      )}
    </div>
  );
};

export default CompanyReview;
