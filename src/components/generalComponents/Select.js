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
        {options.length > 0 ? (
          <>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </>
        ) : (
          <option value="" disabled>Select a {label}</option>
        )}
      </select>
    </>
  );
}