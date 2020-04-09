import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './MapNav.css';

export default function MapNav() {
  const { user, setUser } = useContext(UserContext);
  const toggleMapNav = () => {
    document.querySelector(".map-nav-links").classList.toggle("map-nav-active");
    document.querySelectorAll(".map-nav-links li").forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
      }
    });
    document.querySelector(".map-burger").classList.toggle("toggle");
  };
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
  return (
    <>
      <div className="map-burger" onClick={toggleMapNav}>
        <div className="map-line1"></div>
        <div className="line2"></div>
        <div className="map-line3"></div>
      </div>
      <ul className="map-nav-links">
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