import React, { useState, useEffect } from "react";
import Tooltip from "../generalComponents/Tooltip";
import searchIcon from "../../images/search.svg";

const StorySearchBar = ({
  setGeneralSearchTerm,
  termForSearchBar,
  history,
  loadSpinner,
  searchForStoriesBasedOnSearchTerm,
}) => {
  const [searchTerm, setSearchTerm] = useState(termForSearchBar);

  useEffect(() => {
    setSearchTerm(termForSearchBar);
  }, [termForSearchBar]);

  const onSubmitForm = (event) => {
    event.preventDefault();
    searchForStoriesBasedOnSearchTerm(searchTerm, history);
  };

  const onClickSearch = () => {
    searchForStoriesBasedOnSearchTerm(searchTerm, history);
  };

  return (
    <div className="search-bar-container">
      <h2 id="search-for-stories-title">
        Search For ClimateTree&trade; Stories
        <Tooltip
          id="title-tip"
          dark={false}
          description="View climate change solution stories."
        />
      </h2>
      <form onSubmit={(e) => onSubmitForm(e)} style={{ position: "relative" }}>
        <input
          autoComplete="off"
          type="text"
          id="search-for-story"
          value={searchTerm}
          disabled={loadSpinner}
          placeholder="E.g. Solar, Electric bikes, etc."
          onChange={(e) => setGeneralSearchTerm(e.target.value)}
        />

        <img
          src={searchIcon}
          alt="search"
          onClick={onClickSearch}
          id="search-story-icon"
        />
      </form>
      <p className="story-info">
        Search for any theme like "climate action plan", "electric cars",
        "water", "renewable energy", "women", or "farming". Learn about
        "Filters" on the right. Or browse recent stories by scrolling down.
      </p>
    </div>
  );
};

export default StorySearchBar;
