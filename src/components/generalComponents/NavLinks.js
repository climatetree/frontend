import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './NavLinks.Map.css';
import './NavLinks.css'

export default function NavLinks({ cssScope }) {
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
      jwt: "",
      role: 4,
    });
  };

  function toggleMapNav() {
    document.querySelector(`.${cssScope}nav-links`).classList.toggle(`${cssScope}nav-active`);
    document.querySelectorAll(`.${cssScope}nav-links li`).forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
      }
    });
    document.querySelector(`.${cssScope}burger`).classList.toggle("toggle");
  };
  
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
      <div className={`${cssScope}burger`} onClick={cssScope === 'map-' ? toggleMapNav : navSlide}>
        <div className={`${cssScope}line1`}></div>
        <div className="line2"></div>
        <div className={`${cssScope}line3`}></div>
      </div>
      <ul className={`${cssScope}nav-links`}>
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
            <Link to="/stories" className="underline-hover">
              STORIES
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
    </>
  );
}