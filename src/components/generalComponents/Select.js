import React from 'react';
import './Select.css';

export default function Select({
  name,
  label,
  options,
  value,
  optional,
  onChange,
}) {
  console.log(options);
  return (
    <>
      <label htmlFor={name}>
        {label}
        {optional && (
          <small className="optional-label"> - Optional</small>
        )}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" selected>Select a {label}</option>
        {options.length > 0 && (
          <>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </>
        )}
      </select>
    </>
  );
}