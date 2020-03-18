import React, { useState, useEffect } from "react";

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

  return (
    <div className="search-bar-container">
      <h2 id="search-for-stories-title">Search For Stories</h2>
      <form onSubmit={e => onSubmitForm(e)}>
        <input
          type="text"
          id="search-for-story"
          value={searchTermFromSearchBar}
          disabled={loadSpinner}
          placeholder="Enter Story Title"
          onChange={e => setSearchTermFromSearchBar(e.target.value)}
        />
      </form>
    </div>
  );
};

export default StorySearchBar;
