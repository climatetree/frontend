import React from "react";
import logo from "../../images/white-logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-landing">
      <div>
        <p>All rights reserved</p>
      </div>
      <div>
        <p>ClimateTree</p>
        <img src={logo} alt="climatetree logo" className="logo" />
      </div>
      <div>
        <p>Contact</p>
        <p>Social</p>
      </div>
      <div id="footer-background"></div>
    </footer>
  );
}

export default Footer;
