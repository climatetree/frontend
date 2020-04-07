import React, { useState } from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";

import "./SolutionFilter.css";

const SolutionFilter = ({
  onChangeSolutionTerm,
  debouncedSolutionTerm,
  isSearchingSolution,
  solutions,
  solutionTerm,
}) => {
  const [cursor, setCursor] = useState(0);

  const handleKeyDown = (event, cursor, results) => {
    if (event.keyCode === 38 && cursor > 0) {
      setCursor((prevState) => prevState - 1);
    } else if (event.keyCode === 40 && cursor < results.length - 1) {
      setCursor((prevState) => prevState + 1);
    } else if (event.key === "Enter") {
      return;
    } else {
      setTimeout(() => {
        document.querySelector(".solution-dropdown-container").style.display =
          "block";
      }, 1000);
    }
  };

  const setSolutionTermOnClick = (sol) => {
    onChangeSolutionTerm(sol);
  };

  const setSolutionTermOnEnter = (event, cursor, sols) => {
    if (solutionTerm.length) {
      if (event.key === "Enter" && sols.length > 0) {
        onChangeSolutionTerm(sols[cursor]);
        setCursor(0);
        setTimeout(() => {
          document.querySelector(".solution-dropdown-container").style.display =
            "none";
        }, 100);
      }
    }
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
        onKeyDown={(event) => {
          handleKeyDown(event, cursor, solutions);
          setSolutionTermOnEnter(event, cursor, solutions);
        }}
      />
      <FiltersDropdown
        debouncedFilterTerm={debouncedSolutionTerm}
        results={solutions}
        isSearching={isSearchingSolution}
        setTermOnClick={setSolutionTermOnClick}
        setTermOnEnter={setSolutionTermOnEnter}
        cursor={cursor}
        status="solution"
      />
    </FilterFieldContainer>
  );
};

export default SolutionFilter;
