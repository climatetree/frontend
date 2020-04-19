import React from 'react';
import './Checkbox.css';

export default function Checkbox({
  label,
  checked,
  onChange,
  filled,
}) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name={label}
        id={label}
        className="checkbox"
        checked={checked}
        readOnly
      />
      <span
        className={`checkbox-custom${filled ? ' filled' : ''}`}
        onClick={onChange}
      ></span>
      <label
        htmlFor={label}
        className="checkbox-label"
        onClick={onChange}
      >{label}</label>
    </div>
  );
}