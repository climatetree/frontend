/**
 * Checkbox filter options for the map based such as state, country or urbanextent
 */
import React from 'react';
import Checkbox from './Checkbox';
import './CheckboxGroup.css';

export default function CheckboxGroup({
  label,
  options,
  placeTypesEnabled,
  setPlaceTypesEnabled,
}) {
  const toggleOption = (option) => {
    if (placeTypesEnabled.includes(option)) {
      setPlaceTypesEnabled(
        placeTypesEnabled.filter(type => type !== option)
      );
    } else {
      setPlaceTypesEnabled([
        ...placeTypesEnabled,
        option,
      ]);
    }
  };
  return (
    <div className="checkbox-group-wrapper">
      <label className="checkbox-group-label">
        {label}
      </label>
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={placeTypesEnabled.includes(option)}
          onChange={() => toggleOption(option)}
          filled
        />
      ))}
    </div>
  );
}