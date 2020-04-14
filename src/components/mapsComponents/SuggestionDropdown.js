import React from 'react';
import './SuggestionDropdown.css';

export default function SuggestionDropdown({
  debouncedSearchTerm,
  isSearchingSuggestions,
  placeSuggestions,
  selectedSuggestion,
  handleSuggestionClick,
}) {
  return (
    <div id="suggestions">
      {isSearchingSuggestions ? (
        <p>Searching...</p>
      ) : placeSuggestions.length > 0 ? (
        <>
          {placeSuggestions.map(({ properties }, index) => {
            const { place_id, name, state_name, nation_name, type } = properties;
            return (
              <p
                className={`place-name-dropdown${place_id === selectedSuggestion[0] ? ' highlight' : ''}`}
                key={place_id}
                onClick={() => {
                  handleSuggestionClick(place_id, name, index);
                }}
              >
                {name} - <small>{type}</small>
                <span className="state-nation-name-dropdown">
                  {(type === "NATION" || type === "STATE") ? "" : state_name}
                  {(type === "NATION" || type === "STATE") ? "" : ', '}
                  {type === "NATION" ? "Earth" : nation_name}
                </span>
              </p>
            );
          })}
        </>
      ) : debouncedSearchTerm.length === 1 ? (
        <p>Please enter more than 1 letter</p>
      ) : debouncedSearchTerm.length > 0 ? (
        <p>No suggestion</p>
      ) : (
                <p>User Search History</p>
              )}
    </div>
  );
}