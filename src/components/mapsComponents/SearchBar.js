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
      fetch(`https://places-postgres2.azurewebsites.net/api/names/${debouncedSearchTerm}`)
        .then(response => response.json())
        .then(results => {
          setIsSearching(false);
          setPlaceSuggestions(results);
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
    <div id="main-search">
      <input
        type="text"
        placeholder="Search Climate Tree"
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        // onKeyDown={event => handleKeyDown(event)}
        onFocus={() => {
          document.querySelector('#suggestions').style.visibility = 'visible';
        }}
        onBlur={() => {
          setTimeout(() => {
            document.querySelector('#suggestions').style.visibility = 'hidden';
          }, 200);
        }}
      />
      <div id="suggestions">
        {placeSuggestions.length > 0 ? (
          <>
            {placeSuggestions.map(({placeId, name}) => (
              <p
                key={placeId}
                onClick={() => handleSuggestionClick(placeId, name)}
              >{name}</p>
            ))}
          </>
        ) : (
          <>
            {isSearching ? (
              <p>Searching...</p>
            ) : (
              <p>User Search History</p>
            )}
          </>
        )}
      </div>
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
  );
};