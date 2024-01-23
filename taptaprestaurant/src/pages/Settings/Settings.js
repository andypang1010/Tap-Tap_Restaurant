import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TagInput from "../../components/TagInput/TagInput";
import "./Settings.css";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import EditableField from "../../components/EditableField";

export default function Settings({ socket, data }) {
  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Settings</h2>
      </header>

      <SettingsPanel socket={socket} data={data} />
    </main>
  );
}

function SettingsPanel({ socket, data }) {
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
  );
}
