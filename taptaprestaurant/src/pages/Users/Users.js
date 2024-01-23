import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import "./Users.css";
import { Dropdown } from "react-bootstrap";

const tempUsers = [
  {
    first: "Avery",
    last: "Deemer",
    status: "Active",
    username: "adeemer",
    phone: "717-476-6211",
    email: "averydeemer@gmail.com",
    roles: ["Admin", "User"],
  },
  {
    first: "Avery",
    last: "Deemer",
    status: "Active",
    username: "adeemer",
    phone: "717-476-6211",
    email: "averydeemer@gmail.com",
    roles: ["Admin", "User"],
  },
];

export default function Users({ socket, data, user }) {
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

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
          {filteredItems?.map((item, i) => (
            <User key={i} item={item} user={user} />
          ))}
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

function User({ item, user }) {
  return (
    <li
      className={
        user.username === item.username
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
        <Dropdown>
          <Dropdown.Toggle className="action-button">
            <i className="bx bx-dots-horizontal"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </label>
    </li>
  );
}
