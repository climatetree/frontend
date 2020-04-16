import React, { useState, useEffect } from "react";
import Tooltip from "../generalComponents/Tooltip";
import searchIcon from "../../images/search.svg";

const StorySearchBar = ({
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
        Search For Stories
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
          placeholder="Enter Story Title"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={searchIcon}
          alt="search"
          onClick={onClickSearch}
          id="search-story-icon"
        />
      </form>
      <p className="story-info">
        Not all solution stories are relevant to all places because of
        geographic and demographic characteristics. Thus, we have suggested a
        “taxonomy”, or organizational hierarchy, for the branches of ClimateTree.
        You can filter stories based on this taxonomy to narrow your search.
        Explore the taxonomy further with {" "}
        <a href="https://drawdown.org/" target="_blank">Project Drawdown</a>.
      </p>
    </div>
  );
};

export default StorySearchBar;
