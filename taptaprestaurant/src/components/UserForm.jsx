import { Button, Form } from "react-bootstrap";
import ClearFormModal from "./ClearFormModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TagInput from "./TagInput/TagInput";

import { useNotification } from "./NotificationContext";

const blankFormData = {
  first: "",
  last: "",
  username: "",
  tempPassword: "",
  phone: "",
  email: "",
  roles: [],
};

export default function UserForm({ mode = "New", defaultValues = null }) {
  const { sendNotification } = useNotification();
  const [showClearModal, setShowClearModal] = useState(false);
  const [formData, setFormData] = useState(blankFormData);
  const navigate = useNavigate();

  const handleShowClearModal = () => {
    setShowClearModal(true);
  };

  const handleHideClearModal = () => {
    setShowClearModal(false);
  };

  const clearFormData = () => {
    setFormData(blankFormData);
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
      if (mode === "New") {
        axios
          .post("http://localhost:8008/auth/signup", {
            ...formData,
            restaurantName: "makoto", // TODO
          })
          .then(() => {
            sendNotification(
              "success",
              `Successfully created new user '${formData?.username}'`
            );
            navigate("/Users");
          })
          .catch((error) => {
            console.log(error);
            sendNotification("error", error.message);
          });
      } else {
        axios
          .post("http://localhost:8008/user/updateUserAccount", {
            ...formData,
            restaurantName: "makoto", // TODO
          })
          .then(() => {
            sendNotification(
              "success",
              `Successfully updated user '${formData?.username}'`
            );
            navigate("/Users");
          })
          .catch((error) => {
            console.log(error);
            sendNotification("error", error.message);
          });
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    if (defaultValues !== undefined && defaultValues !== null) {
      setFormData({
        ...blankFormData,
        ...defaultValues,
      });
    }
  }, [defaultValues]);

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
            className="required"
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
            className="required"
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
            className="required"
            placeholder="Ex: 'johnsmith@domain.com'"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
          />
        </Form.Group>
      </fieldset>

      <fieldset className="grid grid--2-cols personal-field box light-bx-shadow mb-4">
        <legend className="light-bx-shadow">Account</legend>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="required"
            placeholder="8-12 characters"
            type="text"
            name="username"
            value={formData?.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        {mode === "New" ? (
          <Form.Group className="mb-3">
            <Form.Label>Temporary Password:</Form.Label>
            <Form.Control
              className="required"
              placeholder="Fill in or leave blank for random password."
              type="text"
              name="tempPassword"
              value={formData?.tempPassword}
              onChange={handleInputChange}
            />
          </Form.Group>
        ) : null}

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
        <Button
          disabled={
            !formData?.first ||
            !formData?.last ||
            !formData?.email ||
            !formData?.username
              ? true
              : null
          }
          className="light-bx-shadow"
          variant="danger"
          type="submit"
        >
          {mode === "New" ? "Create User" : "Save User"}
        </Button>
      </footer>
    </Form>
  );
}
