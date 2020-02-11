import React from 'react';
import './Radio.css';

function Radio({
  name,
  id,
  value,
  checked,
  onChange,
}) {
  return (
    <div className="radio-container">
      <input
        type="radio"
        className="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span
        className="radio-custom"
        onClick={() => onChange(value)}
      ></span>
      <label
        htmlFor={name}
        className="radio-label"
        onClick={() => onChange(value)}
      >{id}</label>
    </div>
  )
}

export default Radio;