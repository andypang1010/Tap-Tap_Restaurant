import { useContext, useEffect, useState } from "react";
import TagInput from "../../components/TagInput/TagInput";
import "./Settings.css";
import { Form, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import EditableField from "../../components/EditableField";
import { SocketContext } from "../../App";
import Header from "../../components/Header";
import { useNotification } from "../../components/NotificationContext";
import { useQuery } from "react-query";
import environment from "../../environment.json"

export default function Settings() {
  const { socket, data } = useContext(SocketContext);

  return (
    <main className="main-content">
      <Header title="Settings" pageTitle="Settings" />

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

function getAllSettings() {
  return axios
    .get(
      `${environment.API_BASEURL}/settings/getAllSettings?restaurantName=${"makoto"}`
    )
    .then((response) => response.data);
}

function SettingsPanel() {
  const { sendNotification } = useNotification();
  const [tableNames, setTableNames] = useState([]);
  const [formData, setFormData] = useState(defaultOptions);
  const { isLoading, data, error } = useQuery(["allSettings"], () =>
    getAllSettings()
  );

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

  const handleUpdateTables = (e) => {
    e.preventDefault();

    axios
      .post(`${environment.API_BASEURL}/table/createTableTemplate`, {
        tableNames,
        restaurantName: "makoto", // TODO
      })
      .then(() => {
        sendNotification("success", `Successfully set new table names`);
      })
      .catch((error) => {
        console.log(error);
        sendNotification("error", error.message);
      });
  };

  useEffect(() => {
    if (data?.tables !== undefined) {
      setTableNames(Object.keys(data?.tables));
    }
  }, [data?.tables]);

  return (
    <section className="settings-panel">
      <Form>
        <Tabs defaultActiveKey="restaurant" className="mb-3" fill>
          <Tab eventKey="restaurant" title="Restaurant">
            <fieldset className="light-bx-shadow box mb-3">
              <div className="d-flex align-items-center justify-content-center gap-4 mb-8">
                <div className="text-center">
                  <p>
                    <strong>{data?.public?.displayName}</strong>
                  </p>
                  <p className="d-flex align-items-center justify-content-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="phone-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    {data?.public?.phone}
                  </p>
                </div>
                <div className="text-center address">
                  <p>{data?.public?.address1}</p>
                  <p>{data?.public?.address2}</p>
                  <p>{data?.public?.address3}</p>
                </div>
              </div>
            </fieldset>
          </Tab>
          <Tab eventKey="tables" title="Tables">
            <fieldset className="d-flex align-items-center gap-4 light-bx-shadow box mb-3">
              <TagInput
                tags={tableNames}
                onSetTags={(tags) => {
                  setTableNames(tags);
                }}
              />

              <button
                className="light-bx-shadow action-button red-hover"
                onClick={handleUpdateTables}
              >
                Set Table Names
              </button>
            </fieldset>
          </Tab>
          <Tab eventKey="menu" title="Menu">
            <fieldset className="light-bx-shadow box mb-3">
              <legend className="light-bx-shadow">Display to Customers:</legend>
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
            </fieldset>
            <fieldset className="light-bx-shadow box">
              <legend className="light-bx-shadow">Orders:</legend>

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
          </Tab>
          <Tab eventKey="users" title="Users">
            <fieldset className="light-bx-shadow box mb-3"></fieldset>
          </Tab>
        </Tabs>
      </Form>
    </section>
  );
}
