import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <>
            <br />
            <div className={"container"}>
                <h1>Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button">
                        Submit
                    </Button>
                </Form>
                <p>Don't have an account? <span><Link to={"/signup"}>Sign up</Link></span></p>
            </div>
            
        </>
    )    
}

export default Login