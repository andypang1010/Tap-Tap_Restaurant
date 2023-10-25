import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";

export default function OrderHistory({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    data !== null && (document.title = `${data.name} Orders`);
    console.log(data);
  }, [data]);

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Order History</h2>
      </header>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />
    </main>
  );
}
