import React from "react";
import { Link, useHistory } from "react-router-dom";

import SideNav from "../generalComponents/SideNav";
import SideNavItem from "../generalComponents/SideNavItem";

import "./AboutSideNav.css";

const AboutSideNav = () => {
  const { location } = useHistory();

  return (
    <>
      <SideNav>
        <SideNavItem>
          <Link
            to="/about"
            className={`about-sidenav-item ${
              location.pathname === "/about" ? "sidenav-active" : ""
            }`}
          >
            ClimateTree Story
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/about/team"
            className={`about-sidenav-item ${
              location.pathname === "/about/team" ? "sidenav-active" : ""
            }`}
          >
            ClimateTree Team
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/about/definition"
            className={`about-sidenav-item ${
              location.pathname === "/about/definition" ? "sidenav-active" : ""
            }`}
          >
            What is ClimateTree?
          </Link>
        </SideNavItem>
        <SideNavItem>
          <Link
            to="/about/space-reflection"
            className={`about-sidenav-item ${
              location.pathname === "/about/space-reflection"
                ? "sidenav-active"
                : ""
            }`}
          >
            Reflection from Space
          </Link>
        </SideNavItem>
      </SideNav>
    </>
  );
};

export default AboutSideNav;
