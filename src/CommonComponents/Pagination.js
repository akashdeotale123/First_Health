import React from "react";
import Pagination from "react-bootstrap/Pagination";

export default function PaginationComponent({
  currentPage,
  totalPages,
  setCurrentPage,
}) { 
  const getPaginationItems = () => {
    const paginationItems = [];
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, startPage + 5);
    if (startPage > 1) {
      paginationItems.push(
        <Pagination.First key="first" onClick={() => setCurrentPage(1)} />
      );
      paginationItems.push(
        <Pagination.Prev
          key="prev"
          onClick={() => setCurrentPage(currentPage - 1)}
        />
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (endPage < totalPages) {
      paginationItems.push(
        <Pagination.Next
          key="next"
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      );
      paginationItems.push(
        <Pagination.Last
          key="last"
          onClick={() => setCurrentPage(totalPages)}
        />
      );
    }
    return paginationItems;
  };

  return <Pagination>{getPaginationItems()}</Pagination>;
}

