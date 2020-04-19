import React from 'react';
import Radio from './Radio';

export default function RadioGroup({
  radio,
  name,
  selectRadioOption,
  onChange,
  filled,
}) {
  return (
    <>
      {radio.map((r) => (
        <Radio
          key={r}
          name={name}
          id={r}
          value={r}
          checked={r === selectRadioOption}
          onChange={onChange}
          filled={filled}
        />
      ))}
    </>
  );
}