/**
 * Filter range for the advanced filter (in %)
 */
import React from 'react';
import Checkbox from '../generalComponents/Checkbox';
import './MinMaxRange.css';

export default function MinMaxRange({
  label,
  name,
  range,
  setRange,
}) {
  return (
    <div className='min-max-container'>
      <Checkbox
        label={label}
        checked={range.apply}
        onChange={() => setRange({
          ...range,
          apply: !range.apply,
        })}
        filled
      />
      <div className="min-max-inputs">
        <input
          type="number"
          name={`${name}-min`}
          id={`${name}-min`}
          placeholder="Min"
          value={range.min}
          onChange={(event) => setRange({
            ...range,
            min: parseInt(event.target.value),
          })}
          disabled={!range.apply}
        />
        <span className={`hyphen${!range.apply ? ' disabled' : ''}`}> - </span>
        <input
          type="number"
          name={`${name}-max`}
          id={`${name}-max`}
          placeholder="Max"
          value={range.max}
          onChange={(event) => setRange({
            ...range,
            max: parseInt(event.target.value),
          })}
          disabled={!range.apply}
        />
      </div>
    </div>
  );
}