import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

const Bookmark = ({ companyId }) => {
  const user = useSelector((state) => state.user);

  const [bookmarked, setBookmarked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.savedCompanies?.includes(companyId)) {
      setBookmarked(true);
    }
  }, [user]);

  if(!user || !user?.name) return null;

  const toggleBookmark = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/toggle-bookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyId }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setBookmarked(!bookmarked);
        dispatch(setUser(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {bookmarked ? (
        <FaBookmark
          size={18}
          onClick={toggleBookmark}
          className="cursor-pointer"
        />
      ) : (
        <FaRegBookmark
          size={18}
          onClick={toggleBookmark}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Bookmark;
