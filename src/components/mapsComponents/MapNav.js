import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import authContext from "../context/authContext";
import './MapNav.css';

export default function MapNav() {
  const [{ isLoggedIn }] = useContext(authContext);
  const toggleMapNav = () => {
    document.querySelector(".map-nav-links").classList.toggle("map-nav-active");
    document.querySelectorAll(".map-nav-links li").forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.2}s`;
      }
    });
    document.querySelector(".map-burger").classList.toggle("toggle");
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
          <Link to="/" className="underline-hover">HOME</Link>
        </li>
        <li>
          <Link to="/about" className="underline-hover">ABOUT</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/login" className="underline-hover">PROFILE</Link>
          </li>
        )}
      </ul>
    </>
  );
}