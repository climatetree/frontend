import React, { useState, useEffect } from "react";
import useDebounce from './helpers/useDebounce';
import searchIcon from "../../images/search.svg";
import "./SearchBar.css";

export default function SearchBar({
  getExactPlaces,
  getSimilarPlaces,
  filters,
  similarPlacesEnabled,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetch(`https://places-postgres2.azurewebsites.net/api/places/${debouncedSearchTerm}`)
        .then(response => response.json())
        .then(results => {
          setIsSearching(false);
          setPlaceSuggestions(results.features);
        });
    } else {
      setPlaceSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     getSimilarPlaces(placeId, filters);
  //   }
  // };

  const handleSuggestionClick = (placeId, name) => {
    setSearchTerm(name);
    if (similarPlacesEnabled) {
      getSimilarPlaces(placeId, filters);
    } else {
      getExactPlaces(name, filters);
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
          // onKeyDown={event => handleKeyDown(event)}
          onFocus={() => {
            document.querySelector('#suggestions').style.display = 'block';
          }}
          onBlur={() => {
            setTimeout(() => {
              document.querySelector('#suggestions').style.display = 'none';
            }, 200);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          id="search"
        // onClick={() => {
        //   if (similarPlacesEnabled) {
        //     getSimilarPlaces(placeId);
        //   } else {
        //     getExactPlaces(debouncedSearchTerm);
        //   }
        // }}
        />
      </div>
      <div id="suggestions">
        {isSearching ? (
          <p>Searching...</p>
        ) : placeSuggestions.length > 0 ? (
          <>
            {placeSuggestions.map(({ properties }) => {
              return (
                <p
                  key={properties.place_id}
                  onClick={() => handleSuggestionClick(properties.place_id, properties.name)}
                >
                  {properties.name}
                </p>
              )
            }
            )}
          </>
        ) : debouncedSearchTerm.length > 0 ? (
          <p>No suggestion</p>
        ) : (
                <p>User Search History</p>
              )}
      </div>
    </div>
  );
};