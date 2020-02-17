import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Checkbox from './Checkbox';
import RadioGroup from './RadioGroup';
import Switch from './Switch';
import MinMaxRange from './MinMaxRange';
import Range from './Range';
import './Filters.css';

function Filters({
  getPlacesForDropdown,
  getSimilarPlaces,
  dropdownPlaces
}) {
  const [values, setValues] = useState({
    checkboxChecked: true,
    selectRadioOption: 'radio1',
    switchOn: true,
    min: '0',
    max: '',
  });
  const filterFn = (place) => {
    const maxValue = values.max === '' ? Number.MAX_VALUE : parseInt(values.max);
    return values.checkboxChecked &&
      values.switchOn &&
      place.population >= parseInt(values.min) &&
      place.population <= maxValue;
  }
  return (
    <>
      <SearchBar
        getPlacesForDropdown={getPlacesForDropdown}
        getSimilarPlaces = {getSimilarPlaces}
        filters={filterFn}
        dropdownPlaces = {dropdownPlaces}
      />
      <div id='ct-map-controls'>
        <Checkbox
          checked={values.checkboxChecked}
          onChange={(value) => setValues({
            ...values,
            checkboxChecked: value,
          })}
        />
        <RadioGroup
          radio={["radio1", "radio2", "radio3"]}
          name="radio-demo"
          selectRadioOption={values.selectRadioOption}
          onChange={(value) => setValues({
            ...values,
            selectRadioOption: value,
          })}
        />
        <Switch
          on={values.switchOn}
          onChange={(value) => setValues({
            ...values,
            switchOn: value,
          })}
        />
        <MinMaxRange
          min={values.min}
          max={values.max}
          onChange={({min, max}) => setValues({
            ...values,
            min,
            max,
          })}
        />
        <Range />
      </div>
    </>
  );
}

export default Filters;