import React, { useEffect, useState } from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";
import ListOfChosenFilterValue from "./ListOfChosenFilterValue";
import AddedFilterNotification from "./AddedFilterNotification";

import "./SolutionFilter.css";

const SolutionFilter = ({
  strategyChosen,
  sectorChosen,
  loadingSolution,
  setSolutionTerm,
  debouncedSolutionTerm,
  isSearchingSolution,
  allSolutions,
  solutionTerm,
  pushSolutionValue,
  removeSolutionValue,
  solutionsChosenArr,
}) => {
  const [showChosenSolutions, setShowChosenSolutions] = useState(false);
  const [addedSolution, setAddedSolution] = useState("");
  const [isSolutionAdded, setIsSolutionAdded] = useState(false);

  useEffect(() => {
    console.log("GOES SOL FIL");
    console.log(addedSolution);
    if (addedSolution) {
      setIsSolutionAdded(true);
      setTimeout(() => setIsSolutionAdded(false), 1000);
    }
  }, [addedSolution]);

  const setSolutionTermOnClick = (solution) => {
    setSolutionTerm(solution);
    setAddedSolution(solution);
    setIsSolutionAdded(true);
    setTimeout(() => setIsSolutionAdded(false), 1000);
  };

  return (
    strategyChosen &&
    sectorChosen && (
      <>
        <FilterFieldContainer>
          <div id="solution-filter-header">
            <FilterLabel for="solution-filter">By Solution</FilterLabel>
            {isSolutionAdded ? (
              <AddedFilterNotification filterValue={addedSolution} />
            ) : (
              ""
            )}
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
            debouncedFilterTerm={debouncedSolutionTerm}
            filterTerm={solutionTerm}
            loadingFilter={loadingSolution}
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
