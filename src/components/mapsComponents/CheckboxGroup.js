import React from 'react';
import Checkbox from './Checkbox';
import './CheckboxGroup.css';

export default function CheckboxGroup({
  label,
  name,
  placeTypesDisabled,
  setPlaceTypesDisabled,
}) {
  const options = ['STATE', 'COUNTY', 'URBANEXTENT'];
  const toggleOption = (operation, option) => {
    if (operation) {
      setPlaceTypesDisabled(
        placeTypesDisabled.filter(type => type !== option)
      );
    } else {
      setPlaceTypesDisabled([
        ...placeTypesDisabled,
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
          checked={!placeTypesDisabled.includes(option)}
          onChange={toggleOption}
        />
      ))}
    </div>
  );
};