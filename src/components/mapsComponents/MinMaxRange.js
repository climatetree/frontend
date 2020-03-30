import React from 'react';
import Checkbox from './Checkbox';
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
        onChange={() => setRange(prevRange => {
          prevRange.apply = !prevRange.apply;
          return { ...prevRange };
        })}
      />
      <div className="min-max-inputs">
        <input
          type="number"
          name={`${name}-min`}
          id={`${name}-min`}
          placeholder="Min"
          value={range.min}
          onChange={(event) => setRange({
            // Not sure that this is async safe, but if I use the
            // prevState => ... pattern, I cannot use the event
            // target value, even if I try event.persist()
            name: range.name,
            min: parseInt(event.target.value),
            max: range.max,
            apply: range.apply,
          })}
        />
        <span style={{ margin: '0 5px' }}> - </span>
        <input
          type="number"
          name={`${name}-max`}
          id={`${name}-max`}
          placeholder="Max"
          value={range.max}
          onChange={(event) => setRange({
            name: range.name,
            min: range.min,
            max: parseInt(event.target.value),
            apply: range.apply,
          })}
        />
      </div>
    </div>
  );
};