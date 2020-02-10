import React from 'react';
import './Checkbox.css';

function Checkbox() {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name="c1"
        id="c1"
        className="checkbox"
      />
      <span className="checkbox-custom"></span>
      <label
        htmlFor="c1"
        className="checkbox-label"
      >Checkbox</label>
    </div>
  );
}

export default Checkbox;