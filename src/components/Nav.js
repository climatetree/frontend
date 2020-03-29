import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import logo from "../images/white-logo.png";
import "./Nav.css";

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const logOut = () => {
    setUser({
      ...user,
      isLoggedIn: false,
      username: "Loggedout",
      email: "NA",
      url: "NA",
      userId: "NA",
      error: "",
      jwt: ""
    });
  };
  return (
    <header className="nav-header">
      <nav>
        <Link to="/" className="logo">
          <img src={logo} alt="climate tree logo" />
          <p id="logo-text">ClimateTree</p>
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
          {user.isLoggedIn && (
            <li>
              <Link to="/login" className="underline-hover">
                <span>PROFILE</span>
              </Link>
            </li>
          )}
          <li>
            {user.isLoggedIn ? (
              <Link to="/login" onClick={logOut} className="underline-hover">
                <span>LOGOUT</span>
              </Link>
            ) : (
              <Link to="/login" className="underline-hover">
                <span>LOGIN</span>
              </Link>
            )}
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
