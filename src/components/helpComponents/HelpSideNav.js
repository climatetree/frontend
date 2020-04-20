import React from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../generalComponents/SideNav";
import SideNavItem from "../generalComponents/SideNavItem";

import "./HelpSideNav.css";

const HelpSideNav = () => {
  const { location } = useHistory();

  return (
    <>
      <SideNav>
        <SideNavItem>
          <Link
            to="/help"
            className={`sidenav-link-item ${
              location.pathname === "/help" ? "sidenav-active" : ""
            }`}
          >
            General
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/help/map"
            className={`sidenav-link-item ${
              location.pathname === "/help/map" ? "sidenav-active" : ""
            }`}
          >
            Map
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/help/stories"
            className={`sidenav-link-item ${
              location.pathname === "/help/stories" ? "sidenav-active" : ""
            }`}
          >
            Stories
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/help/research"
            className={`sidenav-link-item ${
              location.pathname === "/help/research" ? "sidenav-active" : ""
            }`}
          >
            Research
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/help/login-profile"
            className={`sidenav-link-item ${
              location.pathname === "/help/login-profile"
                ? "sidenav-active"
                : ""
            }`}
          >
            Login
          </Link>
        </SideNavItem>
      </SideNav>
    </>
  );
};

export default HelpSideNav;
