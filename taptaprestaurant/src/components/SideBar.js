import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const sideBarData = [
  {
    icon: "bx bxs-home bx-sm",
    linkTo: "#",
    text: "Home",
  },
  {
    icon: "bx bxs-grid-alt bx-sm",
    linkTo: "#",
    text: "Tables",
  },
  {
    icon: "bx bxs-bar-chart-square bx-sm",
    linkTo: "#",
    text: "Statistics",
  },
  {
    icon: "bx bxs-notepad bx-sm",
    linkTo: "#",
    text: "Order History",
  },
  {
    icon: "bx bxs-comment-detail bx-sm",
    linkTo: "#",
    text: "Customer Reviews",
  },
  {
    icon: "bx bxs-user-account bx-sm",
    linkTo: "#",
    text: "Account Details",
  },
];

export default function SideBar() {
  return (
    <nav>
      <Logo />
      <SideBarItems />
    </nav>
  );
}

function Logo() {
  return <h1>TechCafe</h1>;
}

function SideBarItems() {
  return (
    <ul className="nav d-flex flex-column">
      {sideBarData.map((item) => (
        <SideBarItem icon={item.icon} linkTo={item.linkTo} text={item.text} />
      ))}
    </ul>
  );
}

function SideBarItem({ icon, linkTo, text }) {
  return (
    <li>
      <Link className="nav-link border" to={linkTo}>
        <i className={icon} />
      </Link>
    </li>
  );
}
