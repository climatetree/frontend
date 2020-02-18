import React from "react";
import { Link } from "react-router-dom";

import searchIcon from "../../images/search.svg";
import "../../styles/FirstScreen.css";

function FirstScreen({ history }) {
  return (
    <section id="first-screen">
      <div id="animation-first">
        <h1>ClimateTree</h1>
        <p>Start exploring below or visit our About page to learn more.</p>
        <form id="first-screen-search" onSubmit={() => history.push("/stories")}>
          <input type="text" placeholder="Enter a city or ZIP code" />
          <img src={searchIcon} alt="search" id="search" />
        </form>
        <div>
          <button className="primary-btn">
            <a href="#explore-screen">Get Started</a>
          </button>
          <button className="primary-btn">
            <Link to="/maps">Map</Link>
          </button>
        </div>
      </div>
      <div id="background"></div>
    </section>
  );
}

export default FirstScreen;
