import React from "react";

import "./FilterLabel.css";

const FilterLabel = (props) => {
  return (
    <label for={props.forInput} id="filter-label">
      {props.children}
    </label>
  );
};

export default FilterLabel;
