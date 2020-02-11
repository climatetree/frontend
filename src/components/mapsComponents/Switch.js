import React from 'react';
import './Switch.css';

function Switch({
  on,
  onChange,
}) {
  return (
    <div className="switch-container">
      <input
        type="checkbox"
        name="s1"
        id="s1"
        className="switch"
        checked={on}
        onChange={() => onChange(!on)}
      />
      <label
        htmlFor="s1"
        className="switch-label"
      >Switch</label>
    </div>
  );
}

export default Switch;
