import { useState, useEffect, Children } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./Pagination.css";

export default function Pagination({
  itemsPerPage = 10,
  children,
  noResults = "No Results",
  searchFields = []
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredItems, setFilteredItems] = useState(
    Children.toArray(children)
  );

  const listLength = filteredItems.filter((item) => !item.props.ignore).length;

  useEffect(() => {

    setFilteredItems(
      Children.toArray(children).filter(
        (item) => {
          if (item.props.ignore) return true;

          for (let searchField of searchFields) {
            if (item.props.item[searchField].toLowerCase().includes(searchTerm.toLowerCase())) return true;
          }
      })
    );
  }, [searchTerm, children]);

  useEffect(() => {
    setCurrentPage(1);
  }, [children]);

  const totalPages = Math.ceil(listLength / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="pagination-addon-container">
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
            {listLength > itemsPerPage &&
              `Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || listLength === 0}
            className="increment-button"
          >
            <i className="bx bx-chevron-right"></i>
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages || listLength === 0}
            className="last-page-button"
          >
            <i className="bx bx-last-page"></i>
          </button>
        </div>
        <div className="pagination-stats">
          {listLength > 0 && (
            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {itemsPerPage * currentPage > listLength
                  ? listLength
                  : itemsPerPage * currentPage}
              </strong>{" "}
              of <strong>{listLength}</strong> entries
            </span>
          )}
        </div>
      </div>

      <ul className="d-flex flex-wrap align-items-center justify-content-start mb-4">
        {listLength > 0 ? (
          filteredItems
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => item)
        ) : (
          <h5>{noResults}</h5>
        )}
      </ul>
    </div>
  );
}
