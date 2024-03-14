import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import "boxicons/css/boxicons.min.css";
import { useNotification } from "../NotificationContext";

function LoginForm({ successRedirect = "/" }) {
  const { sendNotification } = useNotification();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://taptap-414502.uw.r.appspot.com/auth/login", {
        username,
        password,
        restaurantName: "makoto",
      })
      .then((response) => {
        sendNotification("info", `Logged in as user ${username}`);
        localStorage.setItem("jwt", response.data);
        navigate(successRedirect);
      })
      .catch(() => {
        sendNotification("error", `Username or password is incorrect`);
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <div className="input-container">
            <i className="bx bxs-user bx-sm"></i>
            <Form.Control
              className="input-box"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <div className="input-container">
            <i className="bx bxs-lock bx-sm"></i>
            <Form.Control
              className="input-box"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Form.Group>
        <p className="forgot-password">
          <Link className="forgot-password-link" to={"/signup"}>
            Forgot password?
          </Link>
        </p>
        <Button variant="danger" type="submit" className="btn">
          Login
        </Button>
      </Form>
      <p className="register-message">
        Don't have an account? Contact your system administrator to set you up.
        {/*<Link className="register-link" to={"/Register"}>
          Register
  </Link>*/}
      </p>
    </div>
  );
}

export default LoginForm;
