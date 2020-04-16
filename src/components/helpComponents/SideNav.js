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
          General
        </Link>
      </div>
      <div
        className="help-sidenav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/help/map" className="sidenav-link-item">
          Map
        </Link>
      </div>
      <div
        className="help-sidenav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/help/stories" className="sidenav-link-item">
          Stories
        </Link>
      </div>
      <div
        className="help-sidenav-item"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Link to="/help/research" className="sidenav-link-item">
          Research
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
