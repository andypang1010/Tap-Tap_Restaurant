import { Link, useLocation } from "react-router-dom";

const sideBarData = [
  {
    icon: "bx bx-grid-alt bx-md",
    linkTo: "/Tables",
    text: "Tables",
  },
  {
    icon: "bx bx-history bx-md",
    linkTo: "/OrderHistory",
    text: "Order History",
  },
  {
    icon: "bx bx-food-menu bx-md",
    linkTo: "/Menu",
    text: "Menu",
  },
  {
    icon: "bx bx-user-pin bx-md",
    linkTo: "/Account",
    text: "Account Details",
  },
  {
    icon: "bx bx-group bx-md",
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
    <div className="logo mb-5">
      <h1>
        <strong>TC</strong>
      </h1>
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
    <div className="sidebar-item">
      <Link
        className={`sidebar-link ${
          location.pathname === linkTo ? "active-sidebar-link" : ""
        }`}
        to={linkTo}
      >
        <i className={icon} />
        <p>{text}</p>
      </Link>
    </div>
  );
}
