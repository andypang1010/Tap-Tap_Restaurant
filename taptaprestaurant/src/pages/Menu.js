import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";

export default function Menu({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="main-content">
      <div className="page-title">
        <h2>Menu Editor</h2>
      </div>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      <div className="main-content">
        <div className="menu-box box">
          {data === null ? (
            <h4>Loading...</h4>
          ) : (
            data.menu.map((item) => <div key={item.name}>{item.name}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
