import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";
import Tooltip from "../../generalComponents/Tooltip";

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
}) => {
  const setSectorTermOnClick = (filterVal) => {
    setTaxonomyForSolution(filterVal);
    setSectorTerm(filterVal);
    setSectorChosen(true);
  };

  return (
    strategyChosen && (
      <FilterFieldContainer>
        <div id="sector-filter-header">
          <FilterLabel for="sector-filter">
            By Climate Sector
            <Tooltip
              id="title-tip"
              dark={false}
              description="ClimateTree sector"
            />
          </FilterLabel>
        </div>
        <input
          id="sector-filter"
          autoComplete="off"
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
          loadingFilter={loadingSector}
          setTermOnClick={setSectorTermOnClick}
          status="sector"
        />
      </FilterFieldContainer>
    )
  );
};

export default SectorFilter;
