/**
 * Main component of the landing page 
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useDebounce from "../customHooks/useDebounce";
import searchIcon from "../../images/search.svg";
import "./FirstScreen.css";

export default function FirstScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState("stories");
  const [mapSearchTerm, setMapSearchTerm] = useState("");
  const [researchSearchTerm, setResearchSearchTerm] = useState("");
  const [researchPlaceTerm, setResearchPlaceTerm] = useState('');
  const debouncedSearchTerm = useDebounce(mapSearchTerm, 500);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);

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
          state: { storiesResult: response.data },
        });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
      setIsLoading(true);
      fetch(
        `https://climatetree-api-gateway.azurewebsites.net/places/${debouncedSearchTerm}`
      )
        .then((response) => response.json())
        .then((results) => {
          if (results.features) {
            setPlaceSuggestions(results.features);
          } else {
            setPlaceSuggestions([]);
          }
          setIsLoading(false);
        });
    } else {
      setPlaceSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  // return the search bar for ClimateTree stories based on stories title.
  return (
    <section id="first-screen">
      <div className="tabs">
        <h2
          className={`tab-title animate-opacity ${
            activeTab === "stories" ? "active" : ""
            }`}
        >
          Explore climate change solution
          <br />
          stories anywhere in the world
        </h2>
        <h2
          className={`tab-title animate-opacity ${
            activeTab === "map" ? "active" : ""
            }`}
        >
          Discover similar places
          <br />
          and climate actions happened there
        </h2>
        <h2
          className={`tab-title animate-opacity ${
            activeTab === "research" ? "active" : ""
            }`}
        >
          Find climate actions
          <br />
          and share with the rest of world
        </h2>
        <header>
          <span
            className={`tab-btn ${activeTab === "stories" ? "active" : ""}`}
            onClick={() => setActiveTab("stories")}
            style={{ cursor: "pointer" }}
          >
            Stories
          </span>
          <span
            className={`tab-btn ${activeTab === "map" ? "active" : ""}`}
            onClick={() => setActiveTab("map")}
            style={{ cursor: "pointer" }}
          >
            Map
          </span>
          <span
            className={`tab-btn ${activeTab === "research" ? "active" : ""}`}
            onClick={() => setActiveTab("research")}
            style={{ cursor: "pointer" }}
          >
            Research
          </span>
        </header>
        <div
          id="stories-tab"
          className={`tab-container animate-opacity ${
            activeTab === "stories" ? "active" : ""
            }`}
        >
          <div className="tab-input">
            <input
              type="text"
              placeholder="E.g. Solar, Electric bikes, etc."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchForStories();
                }
              }}
            />
            {!isLoading && (
              <img
                src={searchIcon}
                alt="search stories"
                id="search-stories"
                onClick={searchForStories}
              />
            )}
            {isLoading && <div id="spinner-landing"></div>}
          </div>
          <div className="tab-description">
            <p>Search climate solutions with ClimateTree</p>
            <p>
              Climate change impacts our planet and the lives of people. We are
              here to help with our research platform.
            </p>
          </div>
        </div>
        <div
          id="map-tab"
          className={`tab-container animate-opacity ${
            activeTab === "map" ? "active" : ""
            }`}
        >
          <div className="tab-input">
            <input
              type="text"
              id="map-input"
              placeholder="Enter the name of your city, county, state, or country"
              value={mapSearchTerm}
              onChange={(event) => setMapSearchTerm(event.target.value)}
              onFocus={() => {
                document.querySelector(".place-suggestions").style.display =
                  "block";
              }}
              onBlur={() => {
                setTimeout(() => {
                  const suggestions = document.querySelector(
                    ".place-suggestions"
                  );
                  if (suggestions) {
                    suggestions.style.display = "none";
                  }
                }, 100);
              }}
            />
            {!isLoading && (
              <img
                src={searchIcon}
                alt="search stories"
                id="search-stories"
                onClick={() => {
                  console.log(mapSearchTerm);
                }}
              />
            )}
            {isLoading && <div id="spinner-landing"></div>}
            <div className="place-suggestions">
              {isLoading ? (
                <p>Searching...</p>
              ) : placeSuggestions.length > 0 ? (
                <>
                  {placeSuggestions.map((place) => {
                    const {
                      place_id,
                      name,
                      state_name,
                      nation_name,
                      type,
                    } = place.properties;
                    return (
                      <p
                        key={place_id}
                        onClick={() => {
                          setMapSearchTerm(name);
                          setTimeout(() => {
                            history.push({
                              pathname: "/maps",
                              state: { place: place },
                            });
                          }, 2000);
                        }}
                      >
                        {name} - <small>{type}</small>
                        <span>
                          {(type === "NATION" || type === "STATE") ? "" : state_name}
                          {(type === "NATION" || type === "STATE") ? "" : ', '}
                          {type === "NATION" ? "Earth" : nation_name}
                        </span>
                      </p>
                    );
                  })}
                </>
              ) : debouncedSearchTerm.length <= 1 ? (
                <p>Please enter more than 1 letter</p>
              ) : (
                      <p>No suggestion</p>
                    )}
            </div>
          </div>
          <div className="tab-description">
            <p>View similar places on the map</p>
            <p>
              We will find similar places based on climate parameters and you
              can navigate to find climate solutions happened in those places.
            </p>
          </div>
        </div>
        <div
          id="research-tab"
          className={`tab-container animate-opacity ${
            activeTab === "research" ? "active" : ""
            }`}
        >
          <div className="tab-input">
            <div className="research-input-wrapper">
              <input
                className="research-input"
                id="research-search-term"
                type="text"
                placeholder="E.g. Solar, Electric bikes, etc."
                value={researchSearchTerm}
                onChange={event => setResearchSearchTerm(event.target.value)}
              />
              <label htmlFor="research-search-term">
                Search solution
                <span>Type in climate solutions OR choose from dropdown</span>
              </label>
            </div>
            <div className="research-input-wrapper">
              <input
                className="research-input"
                id="research-place-term"
                type="text"
                placeholder="E.g. Seattle, Washington, etc."
                value={researchPlaceTerm}
                onChange={event => setResearchPlaceTerm(event.target.value)}
              />
              <label htmlFor="research-place-term">
                Search place
                <span>Type in the City, County, State, or Country AND choose from dropdown</span>
              </label>
            </div>
          </div>
          <div className="research-btn-wrapper">
            <button onClick={() => {
              window.open(
                `https://www.google.com/search?q=${researchSearchTerm}+${researchPlaceTerm}`
              );
            }}>Research</button>
            <button onClick={() => {
              history.push({ pathname: '/login' });
            }}>Upload Your Research</button>
          </div>
          <div className="tab-description">
            <p>Discover and share climate solutions</p>
            <p>
              Investigate climate actions on the web and ClimateTree will help
              to share with the world.
            </p>
          </div>
        </div>
      </div>
      <div id="background"></div>
    </section>
  );
}
