import { useState, useEffect } from "react";
//import axios from "axios";
import RestaurantDataListener from "../components/RestaurantDataListener";
import IconContainer from "../components/IconContainer";
import "./Account.css";

export default function Account({ socket }) {
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
    console.log(data);
  }, [data]);

  return (
    <div className="main-content">
      <div className="page-title">
        <h2>Account Details</h2>
      </div>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      {data == null ? (
        <></>
      ) : (
        <div className="account-grid">
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
                number={true}
                prependText="Max Quantity per Order:"
                text={data.maxQuantity}
                onChange={(value) => {
                  data.maxQuantity = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-grid-alt"
                number={true}
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
            <button className="action-button mb-2">Change Username</button>
            <button className="action-button mb-2">Reset Password</button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditableField({
  text,
  icon,
  onChange = () => {},
  prependText,
  number = false,
}) {
  const [newValue, setNewValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  function handleInputChange(value) {
    setNewValue(value);
    onChange(value);
  }

  const handleInput = (event) => {
    if (event.key === "Enter") {
      handleInputChange();
    }
    setNewValue(parseInt(event.target.value) || 0);
  };

  const handleBlur = (event) => {
    if (event.target.value !== text) {
      handleInputChange(parseInt(event.target.value));
    }
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="d-flex align-items-center">
          {prependText && <span>{prependText}</span>}
          <input
            autoFocus
            type={number ? "number" : "text"}
            value={number ? parseInt(newValue) : newValue}
            size={newValue.length + 2 || 4}
            onInput={handleInput}
            onBlur={handleBlur}
          />
          <button>
            <i className="bx bx-check text-success"></i>
          </button>
        </div>
      ) : (
        <IconContainer icon={icon} prependText={prependText} text={text}>
          <EditIcon
            onClick={() => {
              setIsEditing(true);
            }}
          />
        </IconContainer>
      )}
    </div>
  );
}

function EditIcon({ onClick }) {
  return (
    <button className="blank-button" onClick={onClick}>
      <i className="bx bx-pencil"></i>
    </button>
  );
}
