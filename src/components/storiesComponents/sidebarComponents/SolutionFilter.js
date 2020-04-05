import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import "./SolutionFilter.css";

const SolutionFilter = () => {
  return (
    <FilterFieldContainer>
      <FilterLabel for="solution-filter">By Solution</FilterLabel>
      <input
        id="solution-filter"
        className="filter-btn"
        placeholder="Enter a solution"
      />
    </FilterFieldContainer>
  );
};

export default SolutionFilter;
