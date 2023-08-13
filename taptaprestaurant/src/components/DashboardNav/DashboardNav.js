import React from "react";
import { Link } from "react-router-dom";
import "./DashboardNav.css";
import "boxicons/css/boxicons.min.css";

function DashboardNav() {
  return (
    <header className="header">
      <Link className="logo" to={"#"}>
        TechCafe
      </Link>

      <nav className="navbar">
        <Link className="link" to={"#"}>
          <div className="fullscreen-only">
            <i className="bx bxs-home bx-xs bx-tada-hover" />
            Home
          </div>
          <div className="windowed-only">
            <i className="bx bxs-home bx-sm bx-tada-hover" />
          </div>
        </Link>
        <Link className="link" to={"#"}>
          <div className="fullscreen-only">
            <i className="bx bxs-grid-alt bx-xs bx-tada-hover" />
            Tables
          </div>
          <div className="windowed-only">
            <i className="bx bxs-grid-alt bx-sm bx-tada-hover" />
          </div>
        </Link>
        <Link className="link" to={"#"}>
          <div className="fullscreen-only">
            <i className="bx bxs-bar-chart-square bx-xs bx-tada-hover" />
            Statistics
          </div>
          <div className="windowed-only">
            <i className="bx bxs-bar-chart-square bx-sm bx-tada-hover" />
          </div>
        </Link>
        <Link className="link" to={"#"}>
          <div className="fullscreen-only">
            <i className="bx bxs-notepad bx-xs bx-tada-hover" />
            Sales History
          </div>
          <div className="windowed-only">
            <i className="bx bxs-notepad bx-sm bx-tada-hover" />
          </div>
        </Link>
        <Link className="link" to={"#"}>
          <div className="fullscreen-only">
            <i className="bx bxs-comment-detail bx-xs bx-tada-hover" />
            Customer Reviews
          </div>
          <div className="windowed-only">
            <i className="bx bxs-comment-detail bx-sm bx-tada-hover" />
          </div>
        </Link>
        <Link className="link" to={"#"}>
          <div className="fullscreen-only">
            <i className="bx bxs-user-account bx-xs bx-tada-hover" />
            Account Details
          </div>
          <div className="windowed-only">
            <i className="bx bxs-user-account bx-sm bx-tada-hover" />
          </div>
        </Link>
      </nav>
    </header>
  );
}

export default DashboardNav;
