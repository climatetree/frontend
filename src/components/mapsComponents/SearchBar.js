import React, { useState } from 'react';
import searchIcon from '../../images/search.svg';
import './SearchBar.css';

function SearchBar({onSearch}) {
  const [term, setTerm] = useState('');
  const handleSearch = () => {
    onSearch(term);
    setTerm('');
  };
  return (
    <div id='main-search'>
      <input
        type="text"
        placeholder="Search Climate Tree"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <img
        src={searchIcon}
        alt="search"
        id="search"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;