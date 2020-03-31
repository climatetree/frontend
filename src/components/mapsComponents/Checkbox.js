import React from 'react';
import './Checkbox.css';

function Checkbox({
  label,
  checked,
  onChange,
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
        className="checkbox-custom"
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

export default Checkbox;