import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./NavLinks.Map.css";
import "./NavLinks.css";

export default function NavLinks({ cssScope, activeLink }) {
  const { user, setUser } = useContext(UserContext);
  const { location } = useHistory();
  const logOut = () => {
    setUser({
      ...user,
      isLoggedIn: false,
      username: "Loggedout",
      email: "NA",
      url: "NA",
      userId: "NA",
      error: "",
      jwt: "",
      role: 4,
    });
  };

  function toggleMapNav() {
    document
      .querySelector(`.${cssScope}nav-links`)
      .classList.toggle(`${cssScope}nav-active`);
    document
      .querySelectorAll(`.${cssScope}nav-links li`)
      .forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.2
          }s`;
        }
      });
    document.querySelector(`.${cssScope}burger`).classList.toggle("toggle");
  }

  function navSlide() {
    document.querySelector(".nav-links").classList.toggle("nav-active");
    document.querySelectorAll(".nav-links li").forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.2
        }s`;
      }
    });
    document.querySelector(".burger").classList.toggle("toggle");
  }

  return (
    <>
      <div
        className={`${cssScope}burger`}
        onClick={cssScope === "map-" ? toggleMapNav : navSlide}
      >
        <div className={`${cssScope}line1`}></div>
        <div className="line2"></div>
        <div className={`${cssScope}line3`}></div>
      </div>
      <ul className={`${cssScope}nav-links`}>
        <li>
          <Link
            to="/"
            className={`underline-hover ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/maps"
            className={`underline-hover ${
              location.pathname === "/maps" ? "active" : ""
            }`}
          >
            MAP
          </Link>
        </li>
        <li>
          <Link
            to="/stories"
            className={`underline-hover ${
              location.pathname === "/stories" ? "active" : ""
            }`}
          >
            STORIES
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`underline-hover ${
              location.pathname.includes("/about") ? "active" : ""
            }`}
          >
            ABOUT
          </Link>
        </li>
        <li>
          <Link
            to="/help"
            className={`underline-hover ${
              location.pathname.includes("/help") ? "active" : ""
            }`}
          >
            HELP
          </Link>
        </li>
        {user.isLoggedIn && (
          <li>
            <Link
              to="/login"
              className={`underline-hover ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              PROFILE
            </Link>
          </li>
        )}
        <li>
          {user.isLoggedIn ? (
            <Link to="/login" onClick={logOut} className="underline-hover">
              LOGOUT
            </Link>
          ) : (
            <Link
              to="/login"
              className={`underline-hover ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              LOGIN
            </Link>
          )}
        </li>
      </ul>
    </>
  );
}
