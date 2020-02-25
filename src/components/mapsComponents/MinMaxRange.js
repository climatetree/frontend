import React from 'react';
import './MinMaxRange.css';

export default function MinMaxRange({
  label,
  name,
  range,
  setRange,
}) {
  return (
    <div className='min-max-container'>
      <label className="min-max-label">{label}</label>
      <div className="min-max-inputs">
        <input
          type="number"
          name={`${name}-min`}
          id={`${name}-min`}
          placeholder="Min"
          value={range.min}
          onChange={(event) => setRange({
            min: parseInt(event.target.value),
            max: range.max,
          })}
        />
        <span style={{margin: '0 5px'}}> - </span>
        <input
          type="number"
          name={`${name}-max`}
          id={`${name}-max`}
          placeholder="Max"
          value={range.max}
          onChange={(event) => setRange({
            min: range.min,
            max: parseInt(event.target.value),
          })}
        />
      </div>
    </div>
  );
};