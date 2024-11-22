import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPages = () => {
    const pages = [];

    // Render the first few pages and ellipsis for larger numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={i === currentPage ? "active" : ""}
            style={{
              margin: "0 5px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontWeight: i === currentPage ? "bold" : "normal",
            }}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} style={{ margin: "0 5px" }}>
            ...
          </span>
        );
      }
    }

    return pages;
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        style={{
          marginRight: "10px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        &lt; anterior
      </button>

      {renderPages()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={{
          marginLeft: "10px",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        próximo &gt;
      </button>
    </div>
  );
};

export default Pagination;
