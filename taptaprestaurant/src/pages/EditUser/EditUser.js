import { Link, useLocation } from "react-router-dom";
import "./EditUser.css";
import UserForm from "../../components/UserForm";
import { useEffect, useState } from "react";

export default function EditUser() {
  const [userToEdit, setUserToEdit] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUserToEdit(location.state.user);
    console.log(location.state);
  }, [location.state]);

  return (
    <main className="main-content">
      <header className="page-title">
        <h2 className="full-title">
          <Link to="/Users" className="sub-heading">
            Users
          </Link>
          <i className="bx bx-chevrons-right"></i>
          <span>Modify an Existing User</span>
        </h2>
      </header>

      <UserForm defaultValues={userToEdit} mode={"Edit"} />
    </main>
  );
}
