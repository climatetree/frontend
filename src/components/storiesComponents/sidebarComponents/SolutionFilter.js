import React, { useState } from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";
import ListOfChosenFilterValue from "./ListOfChosenFilterValue";

import "./SolutionFilter.css";

const SolutionFilter = ({
  strategyChosen,
  sectorChosen,
  onChangeSolutionTerm,
  debouncedSolutionTerm,
  isSearchingSolution,
  allSolutions,
  solutionTerm,
  pushSolutionValue,
  removeSolutionValue,
  solutionsChosenArr,
}) => {
  const [showChosenSolutions, setShowChosenSolutions] = useState(false);

  const setSolutionTermOnClick = (sol) => {
    onChangeSolutionTerm(sol);
  };

  return (
    strategyChosen &&
    sectorChosen && (
      <>
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
              document.querySelector("#solution").style.display = "block";
            }}
            onBlur={() => {
              setTimeout(() => {
                document.querySelector("#solution").style.display = "none";
              }, 200);
            }}
          />
          <FiltersDropdown
            debouncedFilterTerm={debouncedSolutionTerm}
            filterTerm={solutionTerm}
            allResults={allSolutions}
            isSearching={isSearchingSolution}
            setTermOnClick={setSolutionTermOnClick}
            pushFilter={pushSolutionValue}
            status="solution"
          />
        </FilterFieldContainer>
        {solutionsChosenArr.length ? (
          <span
            id="show-chosen-sectors"
            onClick={() => {
              setShowChosenSolutions(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Show chosen solutions
          </span>
        ) : (
          ""
        )}
        {showChosenSolutions && (
          <ListOfChosenFilterValue
            filtersChosenArr={solutionsChosenArr}
            setShowChosenFilters={setShowChosenSolutions}
            removeFilterValue={removeSolutionValue}
            section={"Solutions"}
          />
        )}
      </>
    )
  );
};

export default SolutionFilter;
