import React from "react";
import logo from "../../images/white-logo.png";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer>
      <div>
        <p>All rights reserved</p>
      </div>
      <div>
        <p>Climate Tree</p>
        <img src={logo} alt="climate tree logo" className="logo" />
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
