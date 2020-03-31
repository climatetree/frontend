import React, { useState, useEffect } from "react";

import searchIcon from "../../images/search.svg";

const StorySearchBar = ({ termForSearchBar, history, loadSpinner }) => {
  const [searchTermFromSearchBar, setSearchTermFromSearchBar] = useState(
    termForSearchBar
  );

  const onSubmitForm = event => {
    event.preventDefault();
    history.push({
      pathname: "/stories",
      search: `?storyTitle=${searchTermFromSearchBar}`
    });
  };

  const onClickSearch = () => {
    history.push({
      pathname: "/stories",
      search: `?storyTitle=${searchTermFromSearchBar}`
    });
  };

  return (
    <div className="search-bar-container">
      <h2 id="search-for-stories-title">Search For Stories</h2>
      <form onSubmit={e => onSubmitForm(e)} style={{ position: "relative" }}>
        <input
          type="text"
          id="search-for-story"
          value={searchTermFromSearchBar}
          disabled={loadSpinner}
          placeholder="Enter Story Title"
          onChange={e => setSearchTermFromSearchBar(e.target.value)}
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
