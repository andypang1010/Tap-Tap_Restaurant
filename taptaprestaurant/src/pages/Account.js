import { useState, useEffect } from "react";
//import axios from "axios";
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
    console.log(data);
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

      {data == null ? (
        <></>
      ) : (
        <section className="account-grid">
          <div className="info account-box box">
            <h3 className="mb-3">Information</h3>
            <IconContainer icon="bx bx-user" text={data.username} />
          </div>
          <div className="restaurant-container">
            <div className="restaurant-info account-box box">
              <h3 className="mb-3">Restaurant Information</h3>
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
                  console.log("newphone: ", data.phone);
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-building-house"
                text={data.address}
                onChange={(value) => {
                  data.address = value;
                  handleAccountUpdate();
                }}
              />
            </div>
            <div className="restaurant-settings account-box box">
              <h3 className="mb-3">Restaurant Settings</h3>
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
                icon="bx bx-yen"
                prependText="Currency:"
                text={data.currency}
                onChange={(value) => {
                  data.currency = value;
                  handleAccountUpdate();
                }}
              />
            </div>
          </div>

          <div className="password-security account-box box">
            <h3 className="mb-3">Password & Security</h3>
            <button className="action-button red-hover mb-2">
              Change Username
            </button>
            <button className="action-button red-hover mb-2">
              Reset Password
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
