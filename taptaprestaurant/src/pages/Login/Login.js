import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle";

function Login() {
  return (
    <main className="d-flex align-items-center justify-content-center h-100">
      <PageTitle title="Login" />
      <LoginForm />
    </main>
  );
}

export default Login;
