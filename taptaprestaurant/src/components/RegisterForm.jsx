import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm/LoginForm";
import "boxicons/css/boxicons.min.css";

function RegisterForm({ successRedirect = "/Login" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://taptap-414502.uw.r.appspot.com/auth/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("jwt", response.data);
        navigate(successRedirect);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
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
        <Button variant="primary" type="submit" className="btn">
          Register
        </Button>
      </Form>
      <p className="register-message">
        Already have an account?{" "}
        <Link className="register-link" to={"/Login"}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
