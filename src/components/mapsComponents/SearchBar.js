import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { throttle, debounce } from "throttle-debounce";
import searchIcon from '../../images/search.svg';
import './SearchBar.css';

function SearchBar({
  getPlacesForDropdown,
  getSimilarPlaces,
  filters,
  dropdownPlaces
}) {
  const [term, setTerm] = useState('');
  const [placeId, setPlaceId] = useState('')

  const setSimilarPlaceId = (val, label) => {
    setPlaceId(String(val));
    setTerm(label);
  }
  
  const getOptions = (inputValue) => {
    new Promise(resolve => {
      setTimeout(() => {
        setTerm(inputValue);
        getPlacesForDropdown(inputValue);
        resolve(dropdownPlaces);
      }, 100)
    })
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getSimilarPlaces(placeId, filters)
    }
  }
  const suggestionHtml = () => {
    if (term.length > 2) {
      return (
        <div id="dropdown-container">
          <ul id="selectMenu">
            {dropdownPlaces.map((place, index)=>{
              return <li key={index} onClick={() => {setSimilarPlaceId(place.value, place.label)}} value={place.value}>{place.label}</li>
            })}
          </ul>
        </div>
      )
    }
  }
  return (
    <div id="search-bar-container">
    <div id='main-search'>
      <input
        type="text"
        placeholder="Search Climate Tree"
        value={term}
        onChange={(event) => getOptions(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <img
        src={searchIcon}
        alt="search"
        id="search"
        onClick={(event) =>{getSimilarPlaces(placeId, filters)}}
      />
      <br/>
      </div>
      {suggestionHtml()}
      </div>
  );
}

export default SearchBar;