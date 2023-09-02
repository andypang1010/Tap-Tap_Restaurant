import { Button } from "react-bootstrap";
import "./SideBar.css";

const sideBarData = [
  {
    icon: "bx bxs-home bx-md",
    linkTo: "#",
    text: "Home",
  },
  {
    icon: "bx bxs-grid-alt bx-md",
    linkTo: "#",
    text: "Tables",
  },
  {
    icon: "bx bxs-bar-chart-square bx-md",
    linkTo: "#",
    text: "Statistics",
  },
  {
    icon: "bx bxs-notepad bx-md",
    linkTo: "#",
    text: "Order History",
  },
  {
    icon: "bx bxs-comment-detail bx-md",
    linkTo: "#",
    text: "Customer Reviews",
  },
  {
    icon: "bx bxs-user-account bx-md",
    linkTo: "#",
    text: "Account Details",
  },
];

export default function SideBar() {
  return (
    <div className="sidebar">
      <Logo />
      <SideBarItems />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>TC</h1>
    </div>
  );
}

function SideBarItems() {
  return (
    <ul className="sidebar-items">
      {sideBarData.map((item) => (
        <SideBarItem
          icon={item.icon}
          linkTo={item.linkTo}
          text={item.text}
          key={item.text}
        />
      ))}
    </ul>
  );
}

function SideBarItem({ icon, linkTo, text }) {
  return (
    <Button variant="light" className="sidebar-item">
      <i className={icon} />
      <h5>{text}</h5>
    </Button>
  );
}
