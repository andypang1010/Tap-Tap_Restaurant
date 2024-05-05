import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../App";

const footerSideBarData = [
  {
    icon: "bx bxs-user-pin",
    linkTo: "/Account",
  },
  {
    icon: "bx bxs-cog",
    linkTo: "/Settings",
  },
];

export default function SideBar() {
  return (
    <div className="sidebar">
      <SideBarItems />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo mb-2">
      <h2>
        <strong>TC</strong>
      </h2>
    </div>
  );
}

function SideBarItems() {
  const { user, restaurantName } = useContext(AuthContext);

  return (
    <div className="sidebar-items">
      <Logo />
      <SideBarItem icon="bx bx-grid-alt" linkTo={`${restaurantName}/Tables`} text="Tables" />
      <SideBarItem
        icon="bx bx-history"
        linkTo={`${restaurantName}/OrderHistory`}
        text="Order History"
      />
      <SideBarItem icon="bx bx-food-menu" linkTo={`${restaurantName}/Menu`} text="Menu" />
      {user?.roles[0] === "Admin" ? (
        <SideBarItem icon="bx bx-group" linkTo={`${restaurantName}/Users`} text="Users" />
      ) : null}
      <div className="sidebar-footer">
        {footerSideBarData.map((item, i) => (
          <FooterSideBarItem icon={item.icon} linkTo={`${restaurantName}${item.linkTo}`} key={i} />
        ))}
      </div>
    </div>
  );
}

function SideBarItem({ icon, linkTo, text }) {
  const location = useLocation();

  return (
    <div className="sidebar-item ">
      <Link
        className={`sidebar-link light-bx-shadow ${
          location.pathname === linkTo ? "active-sidebar-link" : ""
        }`}
        to={linkTo}
      >
        <i className={icon} />
        <span>{text}</span>
      </Link>
    </div>
  );
}

function FooterSideBarItem({ icon, linkTo }) {
  const location = useLocation();

  return (
    <div className="footer-sidebar sidebar-item">
      <Link
        className={`sidebar-link ${
          location.pathname === linkTo ? "active-sidebar-link" : ""
        }`}
        to={linkTo}
      >
        <i className={icon} />
      </Link>
    </div>
  );
}
