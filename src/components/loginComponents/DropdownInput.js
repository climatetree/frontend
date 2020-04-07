import React, { useState, useEffect } from 'react';
import useDebounce from '../mapsComponents/helpers/useDebounce';
import './DropdownInput.css';

export default function DropdownInput({
  name,
  type,
  placeholder,
  label,
  allOptions,
  searchTerm,
  setSearchTerm,
}) {
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setOptions(
        allOptions.filter(s => s.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }
  }, [debouncedSearchTerm]);
  return (
    <div className="dropdown-input">
      <label htmlFor={`${name}`}>
        {label}
        <small className="optional-label"> - Optional</small>
      </label>
      <input
        id={`${name}`}
        name={`${name}`}
        type={`${type}`}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        placeholder={`${placeholder}`}
        onFocus={() => {
          document.querySelector(`#${name}-list`).style.display = 'block';
        }}
        onBlur={() => {
          setTimeout(() => {
            const options = document.querySelector(`#${name}-list`);
            if (options) {
              options.style.display = 'none';
            }
          }, 200);
        }}
      />
      <div id={`${name}-list`}>
        {debouncedSearchTerm.length === 0 ? (
          <>
            {allOptions.map(option => (
              <p
                key={option}
                onClick={() => setSearchTerm(option)}
              >{option}</p>
            ))}
          </>
        ) : options.length > 0 ? (
          <>
            {options.map(option => (
              <p
                key={option}
                onClick={() => setSearchTerm(option)}
              >{option}</p>
            ))}
          </>
        ) : (
          <p>No {name} suggestions</p>
        )}
      </div>
    </div>
  );
}