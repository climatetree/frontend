import React, { useState, useEffect } from "react";

const StorySearchBar = ({ searchTerm, history, loading }) => {
  const [term, setTerm] = useState(searchTerm);
  useEffect(() => console.log("HELLO"), [searchTerm]);

  const onSubmitForm = event => {
    event.preventDefault();
    history.push({ pathname: "/stories", search: `?storyTitle=${term}` });
  };

  return (
    <div className="search-bar-container">
      <h2 id="search-for-stories-title">Search For Stories</h2>
      <form onSubmit={e => onSubmitForm(e)}>
        <input
          type="text"
          id="search-for-story"
          value={term}
          disabled={loading}
          placeholder="Enter Story Title"
          onChange={e => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default StorySearchBar;
