import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";

import "./SolutionFilter.css";

const SolutionFilter = ({
  onChangeSolutionTerm,
  debouncedSolutionTerm,
  isSearchingSolution,
  allSolutions,
  solutionTerm,
}) => {
  const setSolutionTermOnClick = (sol) => {
    onChangeSolutionTerm(sol);
  };

  return (
    <FilterFieldContainer>
      <FilterLabel for="solution-filter">By Solution</FilterLabel>
      <input
        autoComplete="off"
        id="solution-filter"
        className="filter-btn"
        placeholder="Enter a solution"
        value={solutionTerm}
        onChange={(e) => onChangeSolutionTerm(e.target.value)}
        onFocus={() => {
          document.querySelector(".solution-dropdown-container").style.display =
            "block";
        }}
        onBlur={() => {
          setTimeout(() => {
            document.querySelector(
              ".solution-dropdown-container"
            ).style.display = "none";
          }, 200);
        }}
      />
      <FiltersDropdown
        debouncedFilterTerm={debouncedSolutionTerm}
        filterTerm={solutionTerm}
        allResults={allSolutions}
        isSearching={isSearchingSolution}
        setTermOnClick={setSolutionTermOnClick}
        status="solution"
      />
    </FilterFieldContainer>
  );
};

export default SolutionFilter;
