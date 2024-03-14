import { useLocation } from "react-router-dom";
import "./EditUser.css";
import UserForm from "../../components/UserForm";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function EditUser() {
  const [userToEdit, setUserToEdit] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setUserToEdit(location.state.user);
  }, [location.state]);

  return (
    <main className="main-content">
      <Header
        title="Modify an Existing User"
        pageTitle="Edit User"
        subtitle="Users"
        subtitleLink="/Users"
      />

      <UserForm defaultValues={userToEdit} mode={"Edit"} />
    </main>
  );
}
