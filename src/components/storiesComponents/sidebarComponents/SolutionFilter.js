import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";
import Tooltip from "../../generalComponents/Tooltip";

import "./SolutionFilter.css";

const SolutionFilter = ({
  strategyChosen,
  sectorChosen,
  loadingSolution,
  setSolutionTerm,
  allSolutions,
  solutionTerm,
}) => {
  const setSolutionTermOnClick = (solution) => {
    setSolutionTerm(solution);
  };

  return (
    strategyChosen &&
    sectorChosen && (
      <FilterFieldContainer>
        <div id="solution-filter-header">
          <FilterLabel for="solution-filter">
            By Climate Solution
            <Tooltip
              id="title-tip"
              dark={false}
              description={`ClimateTree solution`}
            />
          </FilterLabel>
        </div>
        <input
          autoComplete="off"
          id="solution-filter"
          className="filter-btn"
          placeholder="Enter a solution"
          value={solutionTerm}
          onChange={(e) => setSolutionTerm(e.target.value)}
          onFocus={() => {
            document.querySelector("#solution").style.display = "block";
          }}
          onBlur={() => {
            setTimeout(() => {
              document.querySelector("#solution").style.display = "none";
            }, 200);
          }}
        />
        <FiltersDropdown
          filterTerm={solutionTerm}
          loadingFilter={loadingSolution}
          allResults={allSolutions}
          setTermOnClick={setSolutionTermOnClick}
          status="solution"
        />
      </FilterFieldContainer>
    )
  );
};

export default SolutionFilter;
