import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/white-logo.png";
import "../../styles/Nav.css";

function Nav() {
  return (
    <header>
      <nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src={logo} alt="climatetree logo" />
            <p id="logo-text">ClimateTree</p>
          </div>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className="underline-hover">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/maps" className="underline-hover">
              MAP
            </Link>
          </li>
          <li>
            <Link to="/about" className="underline-hover">
              <span>ABOUT</span>
            </Link>
          </li>
        </ul>
        <div className="burger" onClick={navSlide}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
}

function navSlide() {
  document.querySelector(".nav-links").classList.toggle("nav-active");
  document.querySelectorAll(".nav-links li").forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
        0.2}s`;
    }
  });
  document.querySelector(".burger").classList.toggle("toggle");
}

export default Nav;
