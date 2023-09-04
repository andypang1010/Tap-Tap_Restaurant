import { useState } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import SideBar from "../components/SideBar.js";
import "./style.css";

export default function Tables() {
  const [data, setData] = useState(null);

  return (
    <div className="contain">
      <div className="sidebar">
        <h1 className="logo">TC</h1>

        <div className="sidebar-items">
          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-home bx-md"></i>
              <p>Tables</p>
            </a>
          </div>

          <div className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="bx bxs-chart bx-md"></i>
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
              <i className="bx bxs-comment bx-md"></i>
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

      {/* <ul className="table-list">
        <li className="table"></li>
      </ul> */}
    </div>
  );
}
