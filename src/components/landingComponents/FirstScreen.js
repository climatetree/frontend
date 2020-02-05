import React from "react";
import { Link } from "react-router-dom";

import searchIcon from "../../images/search.svg";
import "../../styles/FirstScreen.css";

function FirstScreen() {
  return (
    <section id="first-screen">
      <div id="animation-first">
        <h1>Climate Tree</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <div id="first-screen-search">
          <input type="text" placeholder="Enter a city or ZIP code" />
          <img src={searchIcon} alt="search" id="search" />
        </div>
        <div>
          <button className="primary-btn">
            <a href="#explore-screen">Get Started</a>
          </button>
          <button className="primary-btn">
            <Link to="/maps">Map</Link>
          </button>
        </div>
        <div id="background"></div>
      </div>
    </section>
  );
}

export default FirstScreen;
