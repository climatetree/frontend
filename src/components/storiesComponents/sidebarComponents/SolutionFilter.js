import React, { useState, useEffect } from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import useDebounceFilter from "../helper/useDebounceFilter";
import SolutionDropdown from "./SolutionDropdown";

import "./SolutionFilter.css";

const SolutionFilter = () => {
  const [solutionTerm, setSolutionTerm] = useState("");
  const debouncedSolutionTerm = useDebounceFilter(solutionTerm, 1000);

  useEffect(() => {
    if (debouncedSolutionTerm) {
    } else {
      // console.log("Hello!!!");
    }
  }, [debouncedSolutionTerm]);

  return (
    <FilterFieldContainer>
      <FilterLabel for="solution-filter">By Solution</FilterLabel>
      <input
        id="solution-filter"
        className="filter-btn"
        placeholder="Enter a solution"
        value={solutionTerm}
        onChange={(e) => setSolutionTerm(e.target.value)}
        onFocus={() => {
          document.getElementById("solution-dropdown-container").style.display =
            "block";
        }}
        onBlur={() => {
          document.getElementById("solution-dropdown-container").style.display =
            "none";
        }}
      />
      <SolutionDropdown debouncedFilterTerm={debouncedSolutionTerm} />
    </FilterFieldContainer>
  );
};

export default SolutionFilter;
