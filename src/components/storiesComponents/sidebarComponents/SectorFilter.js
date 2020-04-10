import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";

import "./SectorFilter.css";

const SectorFilter = ({
  strategyChosen,
  setSectorChosen,
  allSectors,
  sectorTerm,
  setSectorTerm,
}) => {
  const setSectorTermOnClick = (sol) => {
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
      <FilterFieldContainer>
        <FilterLabel for="sector-filter">By Sector</FilterLabel>
        <input
          id="sector-filter"
          className="filter-btn"
          placeholder="Enter a sector"
          value={sectorTerm}
          onChange={(e) => setSectorTerm(e.target.value)}
          onFocus={() => {
            document.querySelector(".sector-dropdown-container").style.display =
              "block";
          }}
          onBlur={() => {
            setTimeout(() => {
              document.querySelector(
                ".sector-dropdown-container"
              ).style.display = "none";
            }, 100);
          }}
        />
        {/* STILL NEED TO IMPLEMENT THIS */}
        <FiltersDropdown
          allResults={allSectors}
          filterTerm={sectorTerm}
          setTermOnClick={setSectorTermOnClick}
          setTermOnEnter={setSectorTermOnEnter}
          status="sector"
        />
      </FilterFieldContainer>
    )
  );
};

export default SectorFilter;
