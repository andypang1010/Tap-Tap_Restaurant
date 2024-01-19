import { Link, useLocation } from "react-router-dom";

const sideBarData = [
  {
    icon: "bx bx-grid-alt",
    linkTo: "/Tables",
    text: "Tables",
  },
  {
    icon: "bx bx-history",
    linkTo: "/OrderHistory",
    text: "Order History",
  },
  {
    icon: "bx bx-food-menu",
    linkTo: "/Menu",
    text: "Menu",
  },
  {
    icon: "bx bx-user-pin",
    linkTo: "/Account",
    text: "Account Details",
  },
  {
    icon: "bx bx-group",
    linkTo: "/Users",
    text: "Users",
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
  return (
    <div className="sidebar-items">
      <Logo />
      {sideBarData.map((item) => (
        <SideBarItem
          icon={item.icon}
          linkTo={item.linkTo}
          text={item.text}
          key={item.text}
        />
      ))}
    </div>
  );
}

function SideBarItem({ icon, linkTo, text }) {
  const location = useLocation();

  return (
    <div className="sidebar-item light-bx-shadow">
      <Link
        className={`sidebar-link ${
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
