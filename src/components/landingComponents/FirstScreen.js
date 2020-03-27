import React, { useState } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../../images/search.svg";
import "./FirstScreen.css";

// import useStories from "../useStories";

function FirstScreen({ history }) {
  // const BASE_URL =
  //   "https://climatetree-api-gateway.azurewebsites.net/stories/title/";
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section id="first-screen">
      <div id="animation-first">
        <h1>Climate Tree</h1>
        <p>Start exploring below or visit our About page to learn more.</p>
        <form
          id="first-screen-search"
          onSubmit={event => {
            event.preventDefault();
            // const stories = useStories("title", event.target.value);
            // console.log(stories);
            history.push({
              pathname: "/stories",
              search: `?storyTitle=${searchTerm}`,
              state: { searchTerm }
            });
          }}
        >
          <input
            type="text"
            placeholder="Search for ClimateTree stories"
            onChange={event => setSearchTerm(event.target.value)}
          />
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
