import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import "./style.css";
import { Dropdown } from "react-bootstrap";

export default function Tables({ socket }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="main-content">
      <div className="page-title">
        <h2>Tables</h2>
      </div>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
        socket={socket}
      />

      {data !== null && (
        <div className="table-list">
          <Table tab={data.tables["1"]} name={"1"} />
          <Table tab={data.tables["2"]} name={"2"} />
        </div>
      )}
    </div>
  );
}

function Table({ tab, name }) {
  useEffect(() => {
    console.log("tab");
  }, [tab]);

  return (
    <div className="table">
      <h4>#{name}</h4>
      <ul className="item-list">
        {tab &&
          tab.map((item, i) => (
            <li className="item" key={i}>
              <div className="item-info">
                <div className="item-description">
                  <span>{item.item.name}</span>
                  <Dropdown className="status-dropdown">
                    <Dropdown.Toggle className="" id="dropdown-basic">
                      {item.status}
                    </Dropdown.Toggle>
                  </Dropdown>
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
    </div>
  );
}
