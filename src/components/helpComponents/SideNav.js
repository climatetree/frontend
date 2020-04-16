import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./SideNav.css";

const SideNav = () => {
  const { location } = useHistory();

  const toggleSidebar = () => {
    document
      .querySelector(".help-sidebar")
      .classList.toggle("help-sidebar-active");
    document
      .querySelector(".sidebar-burger")
      .classList.toggle("sidebar-burger-active");
    document.querySelector(".sidebar-burger").classList.toggle("toggle-help");
  };

  return (
    <>
      <div className="sidebar-burger" onClick={toggleSidebar}>
        <div className="sidebar-line1"></div>
        <div className="sidebar-line2"></div>
        <div className="sidebar-line3"></div>
      </div>
      <div className="help-sidebar">
        <div className="help-sidenav-item">
          <Link
            to="/help"
            className={`sidenav-link-item ${
              location.pathname === "/help" ? "sidenav-active" : ""
            }`}
            onClick={toggleSidebar}
          >
            General
          </Link>
        </div>
        <div className="help-sidenav-item">
          <Link
            to="/help/map"
            className={`sidenav-link-item ${
              location.pathname === "/help/map" ? "sidenav-active" : ""
            }`}
            onClick={toggleSidebar}
          >
            Map
          </Link>
        </div>
        <div className="help-sidenav-item">
          <Link
            to="/help/stories"
            className={`sidenav-link-item ${
              location.pathname === "/help/stories" ? "sidenav-active" : ""
            }`}
            onClick={toggleSidebar}
          >
            Stories
          </Link>
        </div>
        <div className="help-sidenav-item">
          <Link
            to="/help/research"
            className={`sidenav-link-item ${
              location.pathname === "/help/research" ? "sidenav-active" : ""
            }`}
            onClick={toggleSidebar}
          >
            Research
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
