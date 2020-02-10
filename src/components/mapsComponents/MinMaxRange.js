import React from 'react';
import './MinMaxRange.css';

function MinMaxRange() {
  return (
    <div className='min-max-container'>
      <label htmlFor="min">Min</label>
      <input
        type="text"
        name="min"
        id="min"
      />
      <label htmlFor="max">Max</label>
      <input
        type="text"
        name="max"
        id="max"
      />
    </div>
  );
}

export default MinMaxRange;