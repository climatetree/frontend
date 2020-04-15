import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/white-logo.png";
import "./SideNav.css";

const SideNav = () => {
  return (
    <div className="help-sidebar">
      <div
        className="help-sidenav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/help" className="sidenav-link-item">
          <img
            style={{ height: "2rem", marginRight: "5px" }}
            src={logo}
            alt="climate tree logo"
          />
          General
        </Link>
      </div>
      <div
        className="help-sidenav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          style={{ height: "2rem", marginRight: "5px" }}
          className="help-logo"
          src={logo}
          alt="climate tree logo"
        />
        Map
      </div>
      <div
        className="help-sidenav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/help/stories" className="sidenav-link-item">
          <img
            style={{ height: "2rem", marginRight: "5px" }}
            className="help-logo"
            src={logo}
            alt="climate tree logo"
          />
          Stories
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
