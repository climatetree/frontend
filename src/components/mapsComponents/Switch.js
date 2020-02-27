import React from 'react';
import './Switch.css';

export default function Switch({
  label,
  name,
  on,
  onChange,
}) {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={name}
        className="switch"
        checked={on}
        onChange={() => onChange(!on)}
      />
      <label
        htmlFor={name}
        className="switch-label"
      >{label}</label>
    </>
  );
};