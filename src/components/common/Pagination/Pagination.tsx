import React from "react";
import { PaginationProps } from "./Pagination.types";
import { Select, MenuItem } from "@mui/material";
// import styles from "./Pagination.module.css"

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
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
              margin: "0 8px",
              cursor: "pointer",
              border: "none",
              background: "none",
              fontWeight: i === currentPage ? "bold" : "normal",
              fontSize: "14px",
            }}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} style={{ margin: "0 8px", fontSize: "14px" }}>
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: "14px" }}>
        Exibindo:{" "}
        {currentPage * itemsPerPage > totalItems
          ? totalItems
          : currentPage * itemsPerPage}{" "}
        de {totalItems}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{
            marginRight: "10px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            border: "none",
            background: "none",
            fontSize: "14px",
          }}
        >
          &lt;
        </button>

        {renderPages()}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            marginLeft: "10px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            border: "none",
            background: "none",
            fontSize: "14px",
          }}
        >
          &gt;
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        Linhas por página
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemsPerPage}
          size="small"
          label="Age"
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
