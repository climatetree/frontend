import React from 'react';
import './Radio.css';

export default function Radio({
  name,
  id,
  value,
  checked,
  onChange,
  filled,
}) {
  const handleClick = () => {
    if (checked) {
      onChange('');
    } else {
      onChange(value);
    }
  }
  return (
    <div className="radio-container">
      <input
        type="radio"
        className="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={handleClick}
      />
      <span
        className={`radio-custom${filled ? ' filled' : ''}`}
        onClick={handleClick}
      ></span>
      <label
        htmlFor={name}
        className="radio-label"
        onClick={handleClick}
      >{id}</label>
    </div>
  )
}