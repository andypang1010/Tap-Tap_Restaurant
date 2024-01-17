import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import Pagination from "../components/Pagination/Pagination";
import "./Users.css";

const tempUsers = [
  {
    first: "Avery",
    last: "Deemer",
    status: "Active",
    username: "adeemer",
    phone: "717-476-6211",
    email: "averydeemer@gmail.com",
    roles: ["Admin", "User"],
  },
  {
    first: "Avery",
    last: "Deemer",
    status: "Active",
    username: "adeemer",
    phone: "717-476-6211",
    email: "averydeemer@gmail.com",
    roles: ["Admin", "User"],
  }
]

export default function Users({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    data !== null && (document.title = `${data.name} Users`);
    console.log(data);
  }, [data]);
  
  useEffect(() => {
    console.log(tempUsers === null)
  }, [tempUsers]);

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

    <section className="user-list">
      <Pagination itemsPerPage={10} noResults="No users" searchFields={["first", "last", "username", "phone", "email"]}>
        {tempUsers === null ? 
          null
          :
          tempUsers.map((item, i) => 
            <User key={i} item={item} />
          )
        }
      </Pagination>
    </section>

    </main>
  );
}

function User({item}) {
  return (
    <li className="user">
      <label>
        <input type="checkbox" />

        <div className="user-name">
          <span className="user-fullname">{item.first} {item.last}</span>
          <span className="user-username">@{item.username}</span>
        </div>

        <div>{item.status}</div>
        <div>{item.phone}</div>
        <div>{item.email}</div>
        <div>{item.roles.map((role, i) => (
          <span>{role}</span>
        ))}</div>
        <button className="user-actions-button">
          <i class='bx bx-dots-horizontal'></i>
        </button>
      </label>
    </li>
  );
}
