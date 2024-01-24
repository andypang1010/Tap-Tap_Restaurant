import { useState, useEffect } from "react";
import EditableField from "../../components/EditableField";
import IconContainer from "../../components/IconContainer";
import "./Account.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Account({ socket, data, user }) {
  function handleAccountUpdate() {
    if (socket) {
      socket.emit("updateAccount", data);

      socket.on("success", (newData) => {
        console.log("newdata: ", newData);
      });

      socket.on("server-error", (error) => {
        console.log("error: ", error);
      });
    }
  }

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Account Details</h2>
      </header>

      {data === null ? (
        <>
          <div className="info account-box box dummy-container mb-4">
            <h4 className="dummy mb-3">Information</h4>
            <span className="dummy">Username</span>
          </div>
          <div className="restaurant-container mb-4">
            <div className="restaurant-info account-box box dummy-container">
              <h4 className="dummy mb-3">Restaurant Information</h4>
              <span className="dummy">Restaurant Name</span>
              <span className="dummy">Restaurant Phone Number</span>
              <span className="dummy px-5 pb-3">
                Restaurant Address---------------
              </span>
            </div>
            <div className="restaurant-settings account-box box dummy-container">
              <h4 className="dummy mb-3">Restaurant Settings</h4>
              <span className="dummy">Max Quantity: Max Quantity</span>
              <span className="dummy">Max Tables: Max Tables</span>
              <span className="dummy">Language: Language</span>
              <span className="dummy">Currency: Currency</span>
            </div>
          </div>

          <div className="password-security account-box box dummy-container">
            <h4 className="dummy mb-3">Password & Security</h4>
            <button className="action-button red-hover mb-2 py-2 dummy">
              <span className="dummy">Change Username</span>
            </button>
            <button className="action-button red-hover mb-2 py-2 dummy">
              <span className="dummy">Reset Password</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <UserAccountBox user={user} />

          <fieldset className="light-bx-shadow box mb-4">
            <legend className="light-bx-shadow">Password & Security</legend>
            <div className="account-button-list">
              <Link
                to="/Account/ResetPassword"
                className="action-button red-hover mb-2"
              >
                Reset Password
              </Link>
            </div>
          </fieldset>

          <fieldset className="light-bx-shadow box mb-4">
            <legend className="light-bx-shadow">Restaurant</legend>
            <EditableField
              icon="bx bx-comment-detail"
              text={data.name}
              onChange={(value) => {
                data.name = value;
                handleAccountUpdate();
              }}
            />
            <EditableField
              icon="bx bx-phone"
              text={data.phone}
              onChange={(value) => {
                data.phone = value;
                handleAccountUpdate();
              }}
            />
            <EditableField
              as="textarea"
              icon="bx bx-building-house"
              text={data.address}
              onChange={(value) => {
                data.address = value;
                handleAccountUpdate();
              }}
            />
          </fieldset>
        </>
      )}
    </main>
  );
}

function UserAccountBox({ user }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    localStorage.removeItem("jwt");
    navigate("/Login");
  };

  return (
    <fieldset className="light-bx-shadow box mb-4">
      <legend className="light-bx-shadow">User</legend>

      <div className="d-flex justify-content-around">
        <div className="d-flex flex-column">
          <strong className="full-name">
            {user?.first} {user?.last}{" "}
            <span className="status-badge admin">{user?.roles[0]}</span>
          </strong>
          <span className="username">@{user?.username}</span>
        </div>

        <div className="d-flex flex-column">
          <span>{user?.phone}</span>
          <span>{user?.email}</span>
        </div>

        <button className="action-button red-hover" onClick={handleClick}>
          Sign Out
        </button>
      </div>
    </fieldset>
  );
}
