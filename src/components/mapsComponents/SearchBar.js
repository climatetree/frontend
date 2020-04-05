/**
 * Search bar for places:
 * By country
 * By state
 * By city
 */
import React from "react";
import searchIcon from "../../images/search.svg";
import "./SearchBar.css";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  handlePlaceUpdates,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handlePlaceUpdates();
    }
  };
  return (
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
            const suggestions = document.querySelector("#suggestions");
            if (suggestions) {
              suggestions.style.display = "none";
            }
          }, 200);
        }}
      />
      <img
        src={searchIcon}
        alt="search"
        id="search"
        onClick={() => handlePlaceUpdates()}
      />
    </div>
  );
};