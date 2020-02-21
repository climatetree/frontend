import React, { useState, useEffect } from "react";

const StorySearchBar = ({ searchTerm, history }) => {
  const [term, setTerm] = useState(searchTerm);
  useEffect(() => console.log("HELLO"), [searchTerm]);

  const onSubmitForm = event => {
    event.preventDefault();
    history.push({ pathname: "/stories", search: `?storyTitle=${term}` });
  };

  return (
    <div>
      <form onSubmit={e => onSubmitForm(e)}>
        <input
          type="text"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default StorySearchBar;
