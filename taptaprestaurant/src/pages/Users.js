import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";

export default function Users({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="main-content">
      <div className="page-title">
        <h2>Users</h2>
      </div>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />
    </div>
  );
}
