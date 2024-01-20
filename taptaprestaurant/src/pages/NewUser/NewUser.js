import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TagInput from "../../components/TagInput/TagInput";
import "./NewUser.css";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

function ClearFormModal({ show, onHide, onClear }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClear();
    onHide();
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
          <Modal.Title>Clear Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to clear the New User form?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Back
          </Button>
          <Button variant="danger" type="submit">
            Clear
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function NewUser({ socket, data }) {
  return (
    <main className="main-content">
      <header className="page-title">
        <h2 className="full-title">
          <Link to="/Users" className="sub-heading">
            Users
          </Link>
          <i className="bx bx-chevrons-right"></i>
          <span>Create a New User</span>
        </h2>
      </header>

      <NewUserForm socket={socket} />
    </main>
  );
}

function NewUserForm({ socket }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [showClearModal, setShowClearModal] = useState(false);
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    username: "",
    tempPassword: "",
    phone: "",
    email: "",
    roles: [],
  });
  const navigate = useNavigate();

  const handleShowClearModal = () => {
    setShowClearModal(true);
  };

  const handleHideClearModal = () => {
    setShowClearModal(false);
  };

  const clearFormData = () => {
    setFormData({
      first: "",
      last: "",
      username: "",
      tempPassword: "",
      phone: "",
      email: "",
      roles: [],
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .post("http://localhost:8008/auth/signup", {
          ...formData,
          restaurantName: "makoto", // TODO
        })
        .then((response) => {
          console.log(response);
          navigate("/Users");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <ClearFormModal
        show={showClearModal}
        onHide={handleHideClearModal}
        onClear={clearFormData}
      />

      <fieldset className="grid grid--2-cols personal-field box light-bx-shadow mb-4">
        <legend className="light-bx-shadow">Personal</legend>

        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            placeholder="Ex: 'John'"
            type="text"
            name="first"
            value={formData?.first}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            placeholder="Ex: 'Smith'"
            type="text"
            name="last"
            value={formData?.last}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            placeholder="Ex: '888-888-8888'"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Ex: 'johnsmith@domain.com'"
            type="email"
            name="email"
            value={formData?.address}
          />
        </Form.Group>
      </fieldset>

      <fieldset className="grid grid--2-cols personal-field box light-bx-shadow mb-4">
        <legend className="light-bx-shadow">Account</legend>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            placeholder="8-12 characters"
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Temporary Password:</Form.Label>
          <Form.Control
            placeholder="Fill in or leave blank for random password."
            type="text"
            name="tempPassword"
            value={formData?.tempPassword}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 user-roles">
          <Form.Label>Roles:</Form.Label>
          <TagInput
            tags={formData?.roles}
            onSetTags={(tags) => {
              setFormData({
                ...formData,
                roles: tags,
              });
            }}
          />
        </Form.Group>
      </fieldset>

      <footer className="form-button-list">
        <Button
          className="light-bx-shadow"
          variant="light"
          onClick={handleShowClearModal}
        >
          Clear Form
        </Button>
        <Button className="light-bx-shadow" variant="danger" type="submit">
          Create User
        </Button>
      </footer>

      <p className="error-message">{errorMessage}</p>
    </Form>
  );
}
