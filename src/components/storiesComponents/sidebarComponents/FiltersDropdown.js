import React from "react";

import "./FiltersDropdown.css";

const FiltersDropdown = ({
  debouncedFilterTerm,
  results,
  isSearching,
  setTermOnClick,
  setTermOnEnter,
  status,
  cursor,
}) => {
  const renderContent = () => {
    if (debouncedFilterTerm.length === 0) {
      return (
        <div id="initial-search">
          <div>
            <div className="no-input">
              <span>No input yet</span>
            </div>
            <div>
              <span className="enter-input-msg">Input one</span>
            </div>
          </div>
        </div>
      );
    }

    if (isSearching) {
      return (
        <div className="searching">
          <span>Searching...</span>
        </div>
      );
    }

    if (debouncedFilterTerm.length === 1) {
      return (
        <div className="non-hover">
          <span>Enter 2 characters or more</span>
        </div>
      );
    }

    if (results.length > 0) {
      return (
        <>
          {results.map((solution, index) => (
            <div
              className={`filter-entry ${cursor === index ? "active" : ""}`}
              key={index}
              onClick={() => setTermOnClick(solution)}
              onKeyPress={(event) => setTermOnEnter(solution, event)}
            >
              <span>{solution}</span>
            </div>
          ))}
        </>
      );
    }

    return (
      <div className="no-results">
        <span>No results</span>
      </div>
    );
  };

  const decideClassName = () => {
    return status === "solution"
      ? "solution-dropdown-container"
      : "sector-dropdown-container";
  };

  return <div className={decideClassName()}>{renderContent()}</div>;
};

export default FiltersDropdown;
