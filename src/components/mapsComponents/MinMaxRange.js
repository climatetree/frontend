import React from 'react';
import './MinMaxRange.css';

function MinMaxRange({
  min,
  max,
  onChange,
}) {
  return (
    <div className='min-max-container'>
      <label htmlFor="min">Min</label>
      <input
        type="text"
        name="min"
        id="min"
        value={min}
        onChange={(event) => onChange({
          min: event.target.value,
          max,
        })}
      />
      <label htmlFor="max">Max</label>
      <input
        type="text"
        name="max"
        id="max"
        value={max}
        onChange={(event) => onChange({
          min,
          max: event.target.value,
        })}
      />
    </div>
  );
}

export default MinMaxRange;