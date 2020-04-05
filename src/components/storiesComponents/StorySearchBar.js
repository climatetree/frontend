import React, { useState, useEffect } from "react";

import searchIcon from "../../images/search.svg";

const StorySearchBar = ({
  termForSearchBar,
  history,
  loadSpinner,
  searchForStoriesBasedOnSearchTerm
}) => {
  const [searchTerm, setSearchTerm] = useState(termForSearchBar);

  useEffect(() => {
    setSearchTerm(termForSearchBar);
  }, [termForSearchBar]);

  const onSubmitForm = event => {
    event.preventDefault();
    searchForStoriesBasedOnSearchTerm(searchTerm, history);
  };

  const onClickSearch = () => {
    searchForStoriesBasedOnSearchTerm(searchTerm, history);
  };

  return (
    <div className="search-bar-container">
      <h2 id="search-for-stories-title">Search For Stories</h2>
      <form onSubmit={e => onSubmitForm(e)} style={{ position: "relative" }}>
        <input
          type="text"
          id="search-for-story"
          value={searchTerm}
          disabled={loadSpinner}
          placeholder="Enter Story Title"
          onChange={e => setSearchTerm(e.target.value)}
        />

        <img
          src={searchIcon}
          alt="search"
          onClick={onClickSearch}
          style={{
            position: "absolute",
            right: 0,
            top: "30%",
            transform: "translateX(-1.6rem)",
            cursor: "pointer"
          }}
        />
      </form>
    </div>
  );
};

export default StorySearchBar;
