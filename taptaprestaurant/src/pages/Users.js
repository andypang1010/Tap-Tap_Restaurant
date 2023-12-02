import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";

export default function Users({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    data !== null && (document.title = `${data.name} Users`);
    console.log(data);
  }, [data]);

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Users</h2>
      </header>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      <section className="content-box box">Users</section>
    </main>
  );
}
