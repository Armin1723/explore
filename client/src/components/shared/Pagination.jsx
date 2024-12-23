import React from "react";

const Pagination = ({ page = 1, setPage = () => {}, totalPages = 10 }) => {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const siblingCount = 1;
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    if (leftSiblingIndex > 1) {
      pageNumbers.push(1);
      if (leftSiblingIndex > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    if (rightSiblingIndex < totalPages) {
      if (rightSiblingIndex < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((pageNumber, index) =>
      pageNumber === "..." ? (
        <span key={index} className="px-2">
          ...
        </span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-1 mx-1 rounded ${
            pageNumber === page
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-200"
          }`}
        >
          {pageNumber}
        </button>
      )
    );
  };

  return (
    <div className="flex items-center space-x-2 w-full justify-center mt-6 mb-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-primary/60 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-200/30"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-primary/60 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-200/30"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
