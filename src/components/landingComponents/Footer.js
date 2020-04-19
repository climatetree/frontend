import React from "react";
import logo from "../../images/white-logo.png";
import NEUlogo from '../../images/Notched N Motto Wordmark Lockup_Nmotto+Northeastern_WWW_KO.png';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-landing">
      <div className="footer-cols">
        <div className="footer-col">
          <img src={logo} alt="climatetree logo" className="ct-logo" />
          <span className="ct-logo-text">ClimateTree&trade;</span>
        </div>
        <div className="footer-col">
          <img src={NEUlogo} alt="NEU logo" className="neu-logo" />
        </div>
        <div className="footer-col links">
          <h2>Quick Links</h2>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/maps">Map</a>
          <a href="/help">Help</a>
          <a href="/stories">Stories</a>
          <a href="/login">Login</a>
        </div>
        <div className="footer-col">
          <h2>Contact Us</h2>
          <a href="mailto:climatetreecontact@gmail.com">
            climatetreecontact@gmail.com
          </a>
        </div>
      </div>
      <div id="footer-background"></div>
    </footer>
  );
}
