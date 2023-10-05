import { useState, useEffect } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import SideBar from "../components/SideBar.js";
import "./style.css";

export default function Tables() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="contain">
      <div className="sidebar">
        <h1 className="logo">TC</h1>

        <div className="sidebar-items">
          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-grid-alt bx-md"></i>
              <p>Tables</p>
            </a>
          </div>

          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-bar-chart-square bx-md"></i>
              <p>Statistics</p>
            </a>
          </div>

          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-notepad bx-md"></i>
              <p>Order History</p>
            </a>
          </div>

          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-chat bx-md"></i>
              <p>Customer Reviews</p>
            </a>
          </div>

          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-user bx-md"></i>
              <p>Account Details</p>
            </a>
          </div>
        </div>
      </div>

      <div className="page-title">
        <h2>Tables</h2>
      </div>

      <RestaurantDataListener
        onDataChange={setData}
        authorizationFailureRedirect="/Login"
      />

      {data !== null && (
        <div className="table-list">
          <Table tab={data.tables["1"]} name={"1"} />
          <Table tab={data.tables["1"]} name={"1"} />
          <Table tab={data.tables["1"]} name={"1"} />
          <Table tab={data.tables["1"]} name={"1"} />
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
            <li className="item" style={{ backgroundColor: "#444" }} key={i}>
              <div className="item-info">
                <div className="item-description">
                  <span>{item.item.description}</span>
                  <span className="item-price">{item.item.price}</span>
                </div>
                <span className="item-quantity">
                  <em>{item.quantity}</em>
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
