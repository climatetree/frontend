import React from 'react';
import { Link } from 'react-router-dom';
import './MapNav.css';

export default function MapNav() {
  const toggleMapNav = () => {
    const navLinks = document.querySelector('.map-nav-links');
    if (navLinks.style.display === 'block') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'block';
    }
  };
  return (
    <div className="map-nav-wrapper">
      <div className="map-burger" onClick={toggleMapNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className="map-nav-links">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
      </ul>
    </div>
  );
};