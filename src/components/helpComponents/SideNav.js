import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./SideNav.css";

const SideNav = () => {
  const { location } = useHistory();

  return (
    <>
      <div className="help-sidebar">
        <div className="help-sidenav-item">
          <Link
            to="/help"
            className={`sidenav-link-item ${
              location.pathname === "/help" ? "sidenav-active" : ""
            }`}
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
          >
            Research
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNav;
