import React from 'react';
import './Checkbox.css';

function Checkbox({checked, onChange}) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name="c1"
        id="c1"
        className="checkbox"
        checked={checked}
        readOnly
      />
      <span
        className="checkbox-custom"
        onClick={() => onChange(!checked)}
      ></span>
      <label
        htmlFor="c1"
        className="checkbox-label"
        onClick={() => onChange(!checked)}
      >Checkbox</label>
    </div>
  );
}

export default Checkbox;