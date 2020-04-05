import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import searchIcon from "../../images/search.svg";
import "./FirstScreen.css";

export default function FirstScreen({ history }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchForStories = async () => {
    if (searchTerm) {
      setIsLoading(true);
      const response = await axios.get(
        `https://climatetree-api-gateway.azurewebsites.net/stories/title/${searchTerm}`
      );

      if (response.data.length) {
        history.push({
          pathname: "/stories",
          search: `?storyTitle=${searchTerm}`,
          state: { storiesResult: response.data }
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <section id="first-screen">
      <div id="animation-first">
        <h1>Climate Tree</h1>
        <p>Start exploring below or visit our About page to learn more.</p>
        <form
          id="first-screen-search"
          onSubmit={event => {
            event.preventDefault();
            searchForStories();
          }}
        >
          <input
            type="text"
            placeholder="Search for ClimateTree stories"
            onChange={event => setSearchTerm(event.target.value)}
          />
          {!isLoading && (
            <img
              src={searchIcon}
              alt="search"
              id="search"
              onClick={searchForStories}
            />
          )}
          {isLoading && <div id="spinner-landing"></div>}
        </form>
        <div>
          {/* <button className="primary-btn">
            <a href="#explore-screen">Get Started</a>
          </button> */}
          <Link className="primary-btn" to="/maps">
            Map
          </Link>
        </div>
      </div>
      <div id="background"></div>
    </section>
  );
}
