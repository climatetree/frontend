import React from 'react';
import { Link } from 'react-router-dom';
import './MapNav.css';

export default function MapNav() {
  const toggleMapNav = () => {
    document.querySelector(".map-burger").classList.toggle("toggle");
    document.querySelector(".map-nav-links").classList.toggle("map-nav-active");
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
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </>
  );
};