import React, { useState } from 'react';
import './Switch.css';

function Switch() {
  const [on, setOn] = useState(false);
  return (
    <div className="switch-container">
      <input
        type="checkbox"
        name="s1"
        id="s1"
        className="switch"
        checked={on}
        onChange={() => setOn(!on)}
      />
      <label
        htmlFor="s1"
        className="switch-label"
      >Switch</label>
    </div>
  );
}

export default Switch;
