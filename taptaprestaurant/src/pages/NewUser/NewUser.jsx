import "./NewUser.css";
import UserForm from "../../components/UserForm";
import Header from "../../components/Header";

export default function NewUser() {
  return (
    <main className="main-content">
      <Header
        title="Create a New User"
        pageTitle="New User"
        subtitle="Users"
        subtitleLink="/Users"
      />

      <UserForm mode={"New"} />
    </main>
  );
}
