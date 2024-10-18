import React from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

const Pagination = ({ totalPages = 10, page, setPage= ()=>{} }) => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const handleNavigation = (direction) => {
    const newPage = direction === "prev" ? page - 1 : page + 1;
    setPage(newPage);
  }

  return (
    <div className="pagination w-full items-center flex flex-row justify-center pt-4 gap-4">
      <button
        className="rounded-lg px-2 py-1 border border-teal-600 auth-button disabled:hover:before:h-0 disabled:hover:shadow-none disabled:hover:text-current disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handleNavigation('prev')}
        disabled={page == 1}
      >
        Prev
      </button>
      <p className="px-4 mx-1 border-r border-l border-slate-900">{page}</p>
      <button
        className="rounded-lg px-2 py-1 border border-teal-600 auth-button disabled:hover:before:h-0 disabled:hover:shadow-none disabled:hover:text-current disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => handleNavigation('next')}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
