import { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./Pagination.css";

export default function Pagination({
  itemsPerPage = 10,
  itemList = [],
  onFilteredItems,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const newList = itemList.filter((item) => {
      for (let val of Object.values(item)) {
        if (typeof val !== "string" && typeof val !== "number") continue;
        val = val.toString();
        if (val.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      }
      return false;
    });

    setTotalEntries(newList.length);
    onFilteredItems(
      newList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [searchTerm, itemList, currentPage, itemsPerPage, onFilteredItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemList]);

  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="pagination">
      <InputGroup className="w-75">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputGroup.Text>
          <i className="bx bx-search-alt-2"></i>
        </InputGroup.Text>
      </InputGroup>

      <div className="page-buttons">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="first-page-button"
        >
          <i className="bx bx-first-page"></i>
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="increment-button"
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <span className="page-details">
          {totalEntries > itemsPerPage &&
            `Page ${currentPage} of ${totalPages}`}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalEntries === 0}
          className="increment-button"
        >
          <i className="bx bx-chevron-right"></i>
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalEntries === 0}
          className="last-page-button"
        >
          <i className="bx bx-last-page"></i>
        </button>
      </div>
      <div className="pagination-stats">
        {totalEntries > 0 && (
          <span>
            Showing{" "}
            <strong>
              {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {itemsPerPage * currentPage > totalEntries
                ? totalEntries
                : itemsPerPage * currentPage}
            </strong>{" "}
            of <strong>{totalEntries}</strong> entries
          </span>
        )}
      </div>
    </div>
  );
}
