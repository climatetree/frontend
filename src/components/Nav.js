/**
 * Navbar util 
 */
import React from "react";
import { Link } from "react-router-dom";
import NavLinks from './generalComponents/NavLinks';
import logo from "../images/white-logo.png";
import "./Nav.css";

// navbar for large screens 
export default function Nav() {
  return (
    <header className="nav-header">
      <nav>
        <Link to="/" className="logo">
          <img src={logo} alt="climate tree logo" />
          <p id="logo-text">ClimateTree</p>
        </Link>
        <NavLinks cssScope="" />
      </nav>
    </header>
  );
}