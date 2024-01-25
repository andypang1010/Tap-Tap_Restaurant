import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import "./Users.css";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import ActionBanner from "../../components/ActionBanner/ActionBanner";

function DeleteUserModal({ show, onHide, usernames }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = null;

    axios
      .post("http://localhost:8008/user/deleteUser", {
        usernames,
        restaurantName: "makoto", // TODO
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        err = error;
        setErrorMessage(error.message);
      });

    if (err !== null) {
      console.log(err);
    } else {
      onHide();
    }
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
          <Modal.Title>Delete Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete '
            {usernames?.length === 1
              ? `${usernames[0]}'`
              : usernames?.map((username, i) => {
                  if (i === usernames.length - 1) return `'${username}'`;
                  if (i === usernames.length - 2) return `${username}' and `;
                  else return `${username}, `;
                })}
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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [usersToDelete, setUsersToDelete] = useState(null);

  const handleShowDeleteModal = (usersToDelete) => {
    setShowDeleteModal(true);
    setUsersToDelete(usersToDelete);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setUsersToDelete(null);
  };

  const handleToggleUser = (username) => {
    const updatedSelectedUsers = [...selectedUsers];

    const index = updatedSelectedUsers.indexOf(username);

    index === -1
      ? updatedSelectedUsers.push(username)
      : updatedSelectedUsers.splice(index, 1);

    setSelectedUsers(updatedSelectedUsers);
  };

  useEffect(() => {
    setSelectedUsers([]);
  }, [filteredItems]);

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
          usernames={usersToDelete}
        />

        <div className="user-list-header">
          <ActionBanner
            selectedItems={selectedUsers}
            onDelete={handleShowDeleteModal}
          />
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
                onToggleUser={handleToggleUser}
                selected={selectedUsers.includes(item.username)}
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

function User({ item, user, onShowDeleteModal, onToggleUser, selected }) {
  return (
    <li
      className={
        user?.username === item?.username
          ? "user light-bx-shadow youuu"
          : "user light-bx-shadow"
      }
    >
      <label>
        <Form.Check
          className="pointer-events-none center"
          type="checkbox"
          checked={selected}
          onChange={() => onToggleUser(item.username)}
        />

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
            <Link
              to="/Users/EditUser"
              className="d-flex align-items-center justify-content-between gap-2"
              state={{ user: item }}
            >
              <span>Edit</span>
              <i className="bx bx-edit-alt"></i>
            </Link>
            <button
              className="d-flex align-items-center justify-content-between gap-2"
              onClick={(e) => {
                e.preventDefault();
                onShowDeleteModal([item.username]);
              }}
            >
              <span>Delete</span>
              <i className="bx bx-trash"></i>
            </button>
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
