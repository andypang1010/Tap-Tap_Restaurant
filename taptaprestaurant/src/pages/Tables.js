import { useState } from "react";
import RestaurantDataListener from "../components/RestaurantDataListener";
import SideBar from "../components/SideBar.js";
import "./style.css";

export default function Tables() {
  const [data, setData] = useState(null);

  return (
    <div>
      <div className="sidebar">
        <h1 className="logo">TC</h1>

        <div className="sidebar-items">
          <a className="sidebar-item" href="#">
            <i className="bx bxs-home bx-md"></i>
            <p>Tables</p>
          </a>

          <a className="sidebar-item" href="#">
            <i className="bx bxs-chart bx-md"></i>
            <p>Statistics</p>
          </a>

          <a className="sidebar-item" href="#">
            <i className="bx bxs-notepad bx-md"></i>
            <p>Order History</p>
          </a>

          <a className="sidebar-item" href="#">
            <i className="bx bxs-comment bx-md"></i>
            <p>Customer Reviews</p>
          </a>

          <a className="sidebar-item" href="#">
            <i className="bx bxs-user bx-md"></i>
            <p>Account Details</p>
          </a>
        </div>
      </div>
    </div>
  );
}
