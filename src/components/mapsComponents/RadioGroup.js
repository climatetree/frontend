import React from 'react';
import Radio from './Radio';

function RadioGroup({
  radio,
  name,
  selectRadioOption,
  onChange,
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
        />
      ))}
    </>
  );
}

export default RadioGroup;