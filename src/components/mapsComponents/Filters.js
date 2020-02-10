import React, { useState } from 'react';
import Checkbox from './Checkbox';
import RadioGroup from './RadioGroup';
import Switch from './Switch';
import MinMaxRange from './MinMaxRange';
import Range from './Range';
import searchIcon from '../../images/search.svg';
import './Filters.css';
import SearchBar from './SearchBar';

function Filters({onSearch}) {
  const [values, setValues] = useState({
    selectRadioOption: 'radio1',
  });
  return (
    <form>
      <SearchBar onSearch={onSearch} />
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