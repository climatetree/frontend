import React, { useState } from 'react';
import searchIcon from '../../images/search.svg';
import './SearchBar.css';

function SearchBar({
  onSearch,
  filters,
}) {
  const [term, setTerm] = useState('');
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(term, filters);
    }
  };
  return (
    <div id='main-search'>
      <input
        type="text"
        placeholder="Search Climate Tree"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <img
        src={searchIcon}
        alt="search"
        id="search"
        onClick={() => onSearch(term, filters)}
      />
    </div>
  );
}

export default SearchBar;