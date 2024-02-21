import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../App";
import { useNotification } from "../../components/NotificationContext";
import Header from "../../components/Header";

const passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,!@#$%^&*])(?=.{8,})"
);

const minimumOneLowercaseAndUppercase = new RegExp("[a-z][A-Z]*");
const minimumOneNumber = new RegExp("[0-9]+");
const minimumOneSpecialCharacter = new RegExp("[!@#$%^&*]+");

export default function ResetPassword() {
  const { user } = useContext(AuthContext);
  return (
    <main className="main-content">
      <Header
        title="Reset Password"
        pageTitle="Reset Password"
        subtitle="Account"
        subtitleLink="/Account"
      />

      <ResetPasswordForm username={user?.username} />
    </main>
  );
}

function ResetPasswordForm({ username }) {
  const { sendNotification } = useNotification();
  const [retypePassword, setRetypePassword] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

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
        .post("http://localhost:8008/auth/login", {
          username,
          password: formData.oldPassword,
          restaurantName: "makoto",
        })
        .then((response) => {
          console.log(response);
          axios
            .post("http://localhost:8008/auth/updatePassword", {
              newPassword: formData.newPassword,
              username,
              restaurantName: "makoto", // TODO
            })
            .then(() => {
              sendNotification("success", `Successfully updated password`);
              navigate("/Account");
            })
            .catch(() => {
              sendNotification("error", "New password is invalid");
            });
        })
        .catch(() => {
          sendNotification("error", "Old password is invalid.");
        });
    } catch (error) {
      console.error("error", error);
      sendNotification("error", error.message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <fieldset className="personal-field box light-bx-shadow mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Old Password:</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            value={formData?.oldPassword}
            onChange={handleInputChange}
          />
        </Form.Group>

        <p>Password Rules:</p>

        <ul className="password-rules">
          <li
            className={
              formData?.newPassword.length > 8 && "password-rule-match"
            }
          >
            8+ characters in length
          </li>
          <li
            className={
              minimumOneLowercaseAndUppercase.test(formData?.newPassword) &&
              "password-rule-match"
            }
          >
            At least one uppercase and one lowercase letter
          </li>
          <li
            className={
              minimumOneNumber.test(formData?.newPassword) &&
              "password-rule-match"
            }
          >
            At least one number
          </li>
          <li
            className={
              minimumOneSpecialCharacter.test(formData?.newPassword) &&
              "password-rule-match"
            }
          >
            At least one special character
          </li>
        </ul>

        <Form.Group className="mb-3">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            className={
              passwordRegex.test(formData?.newPassword)
                ? "password-match"
                : "no-match"
            }
            type="password"
            name="newPassword"
            value={formData?.newPassword}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Retype New Password:</Form.Label>
          <Form.Control
            className={
              formData?.newPassword === retypePassword &&
              passwordRegex.test(retypePassword)
                ? "password-match"
                : "no-match"
            }
            type="password"
            name="retypePassword"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
        </Form.Group>
      </fieldset>

      <footer className="form-button-list">
        <Button
          disabled={
            formData?.oldPassword?.length > 0 &&
            formData?.newPassword === retypePassword &&
            passwordRegex.test(formData?.newPassword)
              ? null
              : true
          }
          className="light-bx-shadow"
          variant="danger"
          type="submit"
        >
          Reset
        </Button>
      </footer>
    </Form>
  );
}
