import { useState, useEffect } from "react";
import EditableField from "../../components/EditableField";
import IconContainer from "../../components/IconContainer";
import "./Account.css";
import axios from "axios";

export default function Account({ socket, data }) {
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
          <UserAccountBox />
          <section className="restaurant-container mb-4">
            <fieldset className="light-bx-shadow box">
              <legend className="light-bx-shadow">Restaurant Info</legend>
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

            <fieldset className="light-bx-shadow box">
              <legend className="light-bx-shadow">Restaurant Settings</legend>
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
            </fieldset>
          </section>

          <fieldset className="light-bx-shadow box">
            <legend className="light-bx-shadow">Password & Security</legend>
            <div className="account-button-list">
              <button className="action-button red-hover mb-2">
                Change Username
              </button>
              <button className="action-button red-hover mb-2">
                Reset Password
              </button>
            </div>
          </fieldset>
        </>
      )}
    </main>
  );
}

function UserAccountBox() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8008/user/getUserAccount")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <fieldset className="light-bx-shadow box mb-4">
      <legend className="light-bx-shadow">User Info</legend>
      <IconContainer icon="bx bx-user" text={user?.username} />
    </fieldset>
  );
}
