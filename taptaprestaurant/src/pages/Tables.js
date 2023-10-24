import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import "./style.css";

export default function Tables({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="main-content">
      <header className="page-title">
        <h2>Tables</h2>
      </header>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      {data !== null && (
        <ul className="table-list">
          <Table tab={data.tables["1"]} name={"1"} />
          <Table tab={data.tables["2"]} name={"2"} />
        </ul>
      )}
    </main>
  );
}

function Table({ tab, name }) {
  useEffect(() => {
    console.log("tab");
  }, [tab]);

  return (
    <li className="table">
      <h4>#{name}</h4>
      <ul className="item-list">
        {tab &&
          tab.map((item, i) => (
            <li className="item" key={i}>
              <div className="item-info">
                <div className="item-description">
                  <span>{item.item.name}</span>
                  <span className="item-price">
                    &#165;{parseInt(item.item.price) * parseInt(item.quantity)}
                  </span>
                </div>
                <span className="item-quantity">
                  <em>Quantity: {item.quantity}</em>
                </span>
              </div>
            </li>
          ))}
      </ul>
    </li>
  );
}
