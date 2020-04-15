/**
 * Main component of the landing page 
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useDebounce from "../customHooks/useDebounce";
import Tooltip from "../generalComponents/Tooltip";
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

  const mapHint = `Hints: Enter the name of your City, County, State, or \
    Country without words like “county” or “city” (for example) “New York” \
    instead of “New York City” or “New York State”).If you live in a smaller \
    city, town or village, try your local regional administrative unit name \
    (county name or state name, for example: “Thurston” instead of “Olympia”).`;

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
          Discover similar places to yours and climate
          <br />
          change solution stories happening there
        </h2>
        <h2
          className={`tab-title animate-opacity ${
            activeTab === "research" ? "active" : ""
            }`}
        >
          Find climate change solution stories and
          <br />
          share them with the ClimateTree community
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
            <p>Search climate change solutions with ClimateTree</p>
            <p>
              ClimateTree’s fundamental units are called <strong>solution stories</strong>.
              They include content describing climate change adaptation and mitigation strategies
              from across the world. Our database contains a collection of solution stories
              searchable by solution type and by where the solutions come from in the world.
            </p>
            <p>
              Search "Stories" to find solutions by type. We will show you all the solutions
              we have containing the given search terms. It is our hope that by sharing this content, users will
              gain hope, insight, and practical information about how to approach climate
              change solutions in their own locale.
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
              The ClimateTree "Map" feature allows you to find places like yours around the world
              to explore what people there are doing about climate change. When you type in a place you
              will be given a number of places around the world that are similar, according
              to our default search based on population.
            </p>
            <p>
              {mapHint}
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
                <span>
                  Search climate solutions. See {" "}
                  <a href="https://drawdown.org/solutions/table-of-solutions" target="_blank">
                    ProjectDrawdown
                  </a>
                  {" "} for more suggestions.</span>
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
                <span>
                  Type in the City, County, State, or Country AND choose from dropdown.
                </span>
              </label>
            </div>
          </div>
          <div className="research-btn-wrapper">
            <button onClick={() => {
              window.open(
                `https://www.google.com/search?q=${researchSearchTerm}+${researchPlaceTerm}`
              );
            }}>
              Search The Web
            </button>
            <button onClick={() => { history.push({ pathname: '/login' }) }}>
              Upload Stories
            </button>
          </div>
          <div className="tab-description">
            <p>Discover and share climate solutions</p>
            <p>
              Investigate climate change solution stories on the web and ClimateTree
              will help you share with the world.
            </p>
          </div>
        </div>
      </div>
      <div id="background"></div>
    </section>
  );
}
