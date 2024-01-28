import { Link } from "react-router-dom";
import "./NewUser.css";
import UserForm from "../../components/UserForm";
import PageTitle from "../../components/PageTitle";

export default function NewUser() {
  return (
    <main className="main-content">
      <header className="page-title">
        <PageTitle title="New User" />
        <h2 className="full-title">
          <Link to="/Users" className="sub-heading">
            Users
          </Link>
          <i className="bx bx-chevrons-right"></i>
          <span>Create a New User</span>
        </h2>
      </header>

      <UserForm mode={"New"} />
    </main>
  );
}
