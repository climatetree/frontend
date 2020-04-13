import React, { useState } from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";
import ListOfChosenFilterValue from "./ListOfChosenFilterValue";

import "./SectorFilter.css";

const SectorFilter = ({
  strategyChosen,
  setSectorChosen,
  allSectors,
  sectorTerm,
  setSectorTerm,
  strategyTerm,
  loadingSector,
  setTaxonomyForSolution,
  pushSectorValue,
  sectorsChosenArr,
  removeSectorValue,
}) => {
  const [showChosenSectors, setShowChosenSectors] = useState(false);

  const setSectorTermOnClick = (sol) => {
    setTaxonomyForSolution(sol);
    setSectorTerm(sol);
    setSectorChosen(true);
  };

  const setSectorTermOnEnter = (sol, event) => {
    if (event.keyCode === 13) {
      setSectorTerm(sol);
      setSectorChosen(true);
    }
  };

  return (
    strategyChosen && (
      <>
        <FilterFieldContainer>
          <FilterLabel for="sector-filter">By Sector</FilterLabel>
          <input
            id="sector-filter"
            className="filter-btn"
            placeholder="Enter a sector"
            value={sectorTerm}
            onChange={(e) => setSectorTerm(e.target.value)}
            onFocus={() => {
              document.querySelector("#sector").style.display = "block";
            }}
            onBlur={() => {
              setTimeout(() => {
                document.querySelector("#sector").style.display = "none";
              }, 100);
            }}
          />
          <FiltersDropdown
            allResults={allSectors}
            filterTerm={sectorTerm}
            strategyTerm={strategyTerm}
            loadingSector={loadingSector}
            setTermOnClick={setSectorTermOnClick}
            setTermOnEnter={setSectorTermOnEnter}
            pushFilter={pushSectorValue}
            status="sector"
          />
        </FilterFieldContainer>
        {sectorsChosenArr.length ? (
          <span
            id="show-chosen-sectors"
            onClick={() => {
              setShowChosenSectors(true);
              document.body.style.overflow = "hidden";
            }}
          >
            Show chosen sectors
          </span>
        ) : (
          ""
        )}
        {showChosenSectors && (
          <ListOfChosenFilterValue
            sectorsChosenArr={sectorsChosenArr}
            setShowChosenSectors={setShowChosenSectors}
            removeSectorValue={removeSectorValue}
          />
        )}
      </>
    )
  );
};

export default SectorFilter;
