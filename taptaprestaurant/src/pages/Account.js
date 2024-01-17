import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import EditableField from "../components/EditableField";
import IconContainer from "../components/IconContainer";
import "./Account.css";
import io from "socket.io-client";

export default function Account({ socket = io("http://localhost:8008") }) {
  const [data, setData] = useState(null);

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

  useEffect(() => {
    data !== null && (document.title = "Account");
  }, [data]);

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Account Details</h2>
      </header>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

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
          <section className="info account-box box mb-4">
            <h4 className="mb-3">User Info</h4>
            <IconContainer icon="bx bx-user" text={data.username} />
          </section>
          <section className="restaurant-container mb-4">
            <div className="restaurant-info account-box box">
              <h4 className="mb-3">Restaurant Info</h4>
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
            </div>
            <div className="restaurant-settings account-box box">
              <h4 className="mb-3">Restaurant Settings</h4>
              <EditableField
                icon="bx bx-coin-stack"
                type="number"
                prependText="Max Quantity per Order:"
                text={data.maxQuantity}
                onChange={(value) => {
                  data.maxQuantity = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-grid-alt"
                type="number"
                prependText="Number of Tables:"
                text={data.maxTable}
                onChange={(value) => {
                  data.maxTable = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-globe"
                prependText="Language:"
                text={data.language}
                onChange={(value) => {
                  data.language = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-money"
                prependText="Currency:"
                text={data.currency}
                onChange={(value) => {
                  data.currency = value;
                  handleAccountUpdate();
                }}
              />
            </div>
          </section>

          <section className="password-security account-box box">
            <h4 className="mb-3">Password & Security</h4>
            <button className="action-button red-hover mb-2">
              Change Username
            </button>
            <button className="action-button red-hover mb-2">
              Reset Password
            </button>
          </section>
        </>
      )}
    </main>
  );
}
