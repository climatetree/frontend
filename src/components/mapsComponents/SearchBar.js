import React, { useState, useEffect } from "react";
import useDebounce from "./helpers/useDebounce";
import searchIcon from "../../images/search.svg";
import closeIcon from '../../images/x.svg';
import "./SearchBar.css";

export default function SearchBar({
  getSimilarPlaces,
  filters,
  targetPlaceID,
  setTargetPlace,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [isSearching, setIsSearching] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState([]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetch(
        `http://localhost:8080/api/places/${debouncedSearchTerm}`
      )
        .then(response => response.json())
        .then(results => {
          setIsSearching(false);
          setPlaceSuggestions(results.features);
          setSelectedSuggestion([
            results.features[0].properties.place_id,
            0,
          ]);
        });
    } else {
      setPlaceSuggestions([]);
      setSelectedSuggestion([]);
    }
  }, [debouncedSearchTerm]);

  const openConfirmationPanel = () => {
    document.getElementById('suggestions').style.display = 'none';
    document.getElementById('confirmation').style.display = 'flex';
  }
  const closeConfirmationPanel = () => {
    document.getElementById('confirmation').style.display = 'none';
  }
  const handleKeyDown = (event) => {
    if (isSearching) {
      return;
    }
    if (event.key === 'Enter') {
      if (placeSuggestions.length > 1) {
        openConfirmationPanel();
      } else if (
        placeSuggestions.length === 1 &&
        placeSuggestions[0].properties.place_id !== targetPlaceID
      ) {
        setSearchTerm(placeSuggestions[0].properties.name);
        setSelectedSuggestion([
          placeSuggestions[0].properties.place_id,
          0,
        ]);
        setTargetPlace(placeSuggestions[0]);
        getSimilarPlaces(
          placeSuggestions[0].properties.place_id,
          filters
        );
        document.getElementById('suggestions').style.display = 'none';
      }
    }
  };
  const handleSuggestionClick = (placeID, name, index) => {
    setSearchTerm(name);
    if (placeID !== targetPlaceID) {
      setSelectedSuggestion([placeID, index]);
      setTargetPlace(placeSuggestions[index]);
      getSimilarPlaces(placeID, filters);
    }
  };

  return (
    <div id="search-bar">
      <div id="main-search">
        <input
          type="text"
          placeholder="Search by place name"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          onKeyDown={event => handleKeyDown(event)}
          onFocus={() => {
            document.querySelector("#suggestions").style.display = "block";
          }}
          onBlur={() => {
            setTimeout(() => {
              document.querySelector("#suggestions").style.display = "none";
            }, 200);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          id="search"
          onClick={() => {
            if (isSearching) {
              return;
            }
            if (placeSuggestions.length > 1) {
              openConfirmationPanel();
            } else if (
              placeSuggestions.length === 1 &&
              placeSuggestions[0].properties.place_id !== targetPlaceID
            ) {
              setSearchTerm(placeSuggestions[0].properties.name);
              setSelectedSuggestion([
                placeSuggestions[0].properties.place_id,
                0,
              ]);
              setTargetPlace(placeSuggestions[0]);
              getSimilarPlaces(
                placeSuggestions[0].properties.place_id,
                filters
              );
              document.getElementById('suggestions').style.display = 'none';
            }
          }}
        />
      </div>
      <div id="suggestions">
        {isSearching ? (
          <p>Searching...</p>
        ) : placeSuggestions.length > 0 ? (
          <>
            {placeSuggestions.map(({ properties }, index) => {
              const { place_id, name, state_name, nation_name } = properties;
              return (
                <p
                  className={`place-name-dropdown${place_id === selectedSuggestion[0] ? ' highlight' : ''}`}
                  key={place_id}
                  onClick={() => {
                    handleSuggestionClick(place_id, name, index);
                  }}
                >
                  {name}
                  <span className="state-nation-name-dropdown">
                    {state_name} {state_name ? "," : ""} {nation_name}
                  </span>
                </p>
              );
            })}
          </>
        ) : debouncedSearchTerm.length > 0 ? (
          <p>No suggestion</p>
        ) : (
          <p>User Search History</p>
        )}
      </div>
      <div id="confirmation">
        <div id="confirmation-panel">
          <img
            className="close-btn"
            src={closeIcon}
            alt="close suggestion"
            onClick={closeConfirmationPanel}
          />
          <p className="confirmation-title">Did you mean</p>
          {placeSuggestions.map(({ properties }, index) => {
            const { place_id, name, state_name, nation_name } = properties;
            return (
              <div
                className="confirmation-item"
                key={place_id}
                onClick={() => {
                  handleSuggestionClick(place_id, name, index);
                  closeConfirmationPanel();
                }}
              >
                <p>{name}</p>
                <p className="state-nation-name-dropdown">
                  {state_name} {state_name ? "," : ""} {nation_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
