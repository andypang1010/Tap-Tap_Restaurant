import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import 'boxicons/css/boxicons.min.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

        axios.get("http://localhost:8008/protected")
        .then((response) => {
            console.log(response);
            console.log('User is logged in!');
        }).catch((error) => {
            console.log(error);
        })
    }, []);*/

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8008/auth/login", {
            username,
            password,
        }).then((response) => {
            console.log(response);
            localStorage.setItem('jwt', response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    return(
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
                        <i className='bx bxs-lock bx-sm' ></i>
                        <Form.Control
                            className="input-box"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </Form.Group>
                <p className="forgot-password"><Link className="forgot-password-link"to={"/signup"}>Forgot password?</Link></p>
                <Button variant="primary" type="submit" className="btn">
                    Login
                </Button>
            </Form>
            <p className="register-message">Don't have an account? <Link className="register-link" to={"/signup"}>Register</Link></p>
        </div>
    );
};

export default LoginForm;