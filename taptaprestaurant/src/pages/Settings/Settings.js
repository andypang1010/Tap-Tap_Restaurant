import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TagInput from "../../components/TagInput/TagInput";
import "./Settings.css";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import EditableField from "../../components/EditableField";
import { SocketContext } from "../../App";
import PageTitle from "../../components/PageTitle";

export default function Settings() {
  const { socket, data } = useContext(SocketContext);

  return (
    <main className="main-content">
      <header className="page-title">
        <PageTitle title="Settings" />
        <h2>Settings</h2>
      </header>

      <SettingsPanel socket={socket} data={data} />
    </main>
  );
}

const defaultOptions = {
  restaurant_display_name: "",
  restaurant_phone: "",
  restaurant_address_1: "",
  restaurant_address_2: "",
  restaurant_address_3: "",
  restaurant_currency: "JPY",
  restaurant_language: "EN",
  menu_display_description: true,
  menu_display_vegetarian_label: false,
  menu_display_vegan_label: true,
  menu_display_alcohol_label: true,
  menu_order_max_quantity: 10,
};

function SettingsPanel({ socket, data }) {
  const [formData, setFormData] = useState(defaultOptions);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseInt(value)
        : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

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
    <section className="settings-panel">
      <Form>
        <fieldset className="light-bx-shadow box mb-3">
          <legend className="light-bx-shadow">Restaurant</legend>

          <div className="grid grid--2-cols">
            <div>
              <EditableField
                icon="bx bx-comment-detail"
                text={data?.name}
                onChange={(value) => {
                  data.name = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-phone"
                text={data?.phone}
                onChange={(value) => {
                  data.phone = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                as="textarea"
                icon="bx bx-building-house"
                text={data?.address}
                onChange={(value) => {
                  data.address = value;
                  handleAccountUpdate();
                }}
              />
            </div>

            <div>
              <EditableField
                icon="bx bx-globe"
                prependText="Language:"
                text={data?.language}
                onChange={(value) => {
                  data.language = value;
                  handleAccountUpdate();
                }}
              />
              <EditableField
                icon="bx bx-money"
                prependText="Currency:"
                text={data?.currency}
                onChange={(value) => {
                  data.currency = value;
                  handleAccountUpdate();
                }}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="light-bx-shadow box mb-3">
          <legend className="light-bx-shadow">Tables</legend>
        </fieldset>

        <fieldset className="light-bx-shadow box mb-3">
          <legend className="light-bx-shadow">Menu</legend>

          <h5 className="mb-3">Display to Customers:</h5>
          <Form.Check
            id="menu_display_description"
            type="checkbox"
            label="Description"
            name="menu_display_description"
            checked={formData?.menu_display_description}
            onChange={handleInputChange}
          />
          <Form.Check
            id="menu_display_vegetarian_label"
            type="checkbox"
            label="Vegetarian Label"
            name="menu_display_vegetarian_label"
            checked={formData?.menu_display_vegetarian_label}
            onChange={handleInputChange}
          />
          <Form.Check
            id="menu_display_vegan_label"
            type="checkbox"
            label="Vegan Label"
            name="menu_display_vegan_label"
            checked={formData?.menu_display_vegan_label}
            onChange={handleInputChange}
          />
          <Form.Check
            id="menu_display_alcohol_label"
            type="checkbox"
            label="Alcohol Label"
            name="menu_display_alcohol_label"
            checked={formData?.menu_display_alcohol_label}
            onChange={handleInputChange}
          />

          <h5 className="mb-3">Orders:</h5>

          <Form.Label>Max Quantity per Order:</Form.Label>
          <Form.Control
            type="number"
            min="1"
            step="1"
            placeholder="#"
            name="menu_order_max_quantity"
            value={formData?.menu_order_max_quantity}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className="light-bx-shadow box mb-3">
          <legend className="light-bx-shadow">Users</legend>
        </fieldset>
      </Form>
    </section>
  );
}
