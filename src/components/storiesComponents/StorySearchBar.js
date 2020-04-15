import React, { useState, useEffect } from "react";

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
      <h2 id="search-for-stories-title">Search For Stories</h2>
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
        ClimateTree’s fundamental units are called <strong>“solution stories”</strong>.
        They include content describing climate change adaptation and mitigation strategies
        from across the world. It is our hope that by sharing this content, users will
        gain hope, insight, and practical information about how to approach climate
        change solutions in their own locale.
      </p>
      <p className="story-info">
        Not all solution stories, however, are relevant to all places because of
        geographic and demographic characteristics. Thus, we have suggested a
        “taxonomy”, or organizational hierarchy, for the branches of the ClimateTree.
        You can explore the taxonomy further with {" "}
        <a href="https://drawdown.org/" target="_blank">Project Drawdown</a>.
      </p>
    </div>
  );
};

export default StorySearchBar;
