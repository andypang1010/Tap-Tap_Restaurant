import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import "./Users.css";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

function DeleteUserModal({ show, onHide, user }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8008/user/deleteUser", {
        user,
        restaurantName: "makoto", // TODO
      })
      .then((response) => {
        onHide();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete '{user?.username}'
            {user?.first && user?.last ? ` (${user?.first} ${user?.last})` : ""}
            ? This is permanent.
          </p>
          <p className="error-message">{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button variant="danger" type="submit">
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function Users({ socket, data, user }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleShowDeleteModal = (userToDelete) => {
    setShowDeleteModal(true);
    setUserToDelete(userToDelete);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Users</h2>
      </header>

      <div className="user-list-wrapper">
        <Pagination
          itemsPerPage={10}
          itemList={data?.users}
          filteredItems={filteredItems}
          onFilteredItems={setFilteredItems}
        />

        <DeleteUserModal
          show={showDeleteModal}
          onHide={handleHideDeleteModal}
          user={userToDelete}
        />

        <div className="user-list-header">
          <div className="action-banner"></div>
          <span></span>
          <span>Full Name</span>
          <span>Status</span>
          <span>Phone</span>
          <span>Email</span>
          <span>Roles</span>
          <span>Actions</span>
        </div>

        <ul className="user-list">
          {filteredItems?.length > 0 ? (
            filteredItems?.map((item, i) => (
              <User
                key={i}
                item={item}
                user={user}
                onShowDeleteModal={handleShowDeleteModal}
              />
            ))
          ) : (
            <p>No results</p>
          )}
        </ul>

        <Link
          to="/Users/NewUser"
          role="button"
          className="action-button red-hover"
        >
          Add New User
        </Link>
      </div>
    </main>
  );
}

function User({ item, user, onShowDeleteModal }) {
  return (
    <li
      className={
        user?.username === item?.username
          ? "user bg-light-green"
          : "user bg-white"
      }
    >
      <label>
        <input type="checkbox" />
        <div className="user-name">
          <span className="user-fullname">
            {item.first} {item.last}
          </span>
          <span className="user-username">@{item.username}</span>
        </div>
        <div>{item.status}</div>
        <div>{item.phone}</div>
        <div>{item.email}</div>
        <div>
          {item.roles?.map((role, i) => (
            <span key={i}>{role}</span>
          ))}
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <i className="bx bx-dots-horizontal"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/Users/EditUser" state={{ user: item }}>
              Edit
            </Link>
            <a onClick={() => onShowDeleteModal(item)}>Delete</a>
          </div>
        </div>

        {/*<Dropdown>
          <Dropdown.Toggle className="action-button">
            <i className="bx bx-dots-horizontal"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link to="/Users/EditUser" state={{ user: item }}>
              Edit
            </Link>
            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
          */}
      </label>
    </li>
  );
}
