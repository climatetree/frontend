import React from 'react';
import {Link} from 'react-router-dom';
import './MapSignIn.css';

export default function MapSignIn() {
  return (
    <div className="map-signin-wrapper">
      <Link to="/login" className="map-signin-btn">
        Sign in
      </Link>
    </div>
  );
};