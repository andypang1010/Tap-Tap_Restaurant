import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import { Form } from "react-bootstrap";
import StatusSelect from "../components/StatusSelect";

export default function Tables({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    data !== null && (document.title = `${data.name} Tables`);
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
    console.log(tab);
  }, [tab]);

  return (
    <li className="table box">
      <h4>#{name}</h4>
      <ul className="item-list">
        {tab &&
          tab.map((item, i) => (
            <li className="item" key={i}>
              <div className="item-info">
                <div className="item-description">
                  <p>{item.item.name}</p>
                  <span className="item-quantity">
                    <em>Quantity: {item.quantity}</em>
                  </span>
                </div>
                <div className="item-status">
                  <StatusSelect menuItem={item} />
                </div>
                <span className="item-price">
                  &#165;{parseInt(item.item.price) * parseInt(item.quantity)}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </li>
  );
}
