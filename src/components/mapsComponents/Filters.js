import React, { useState } from 'react';
import Checkbox from './Checkbox';
import RadioGroup from './RadioGroup';
import Switch from './Switch';
import MinMaxRange from './MinMaxRange';
import Range from './Range';
import searchIcon from '../../images/search.svg';
import './Filters.css';

function Filters(initialValues) {
  const [values, setValues] = useState({
    selectRadioOption: 'radio1',
  });
  return (
    <form>
      <div id='main-search'>
        <input
          type="text"
          placeholder="Search Climate Tree"
        />
        <img src={searchIcon} alt="search" id="search" />
      </div>
      <div id='ct-map-controls'>
        <Checkbox />
        <RadioGroup
          radio={["radio1", "radio2", "radio3"]}
          name="radio-demo"
          selectRadioOption={values.selectRadioOption}
          onChange={(value) => setValues({
            ...values,
            selectRadioOption: value,
          })}
        />
        <Switch />
        <MinMaxRange />
        <Range />
        <button
          onClick={(event) => {
            event.preventDefault();
            console.log(values);
          }}
        >Apply</button>
      </div>
    </form>
  );
}

export default Filters;