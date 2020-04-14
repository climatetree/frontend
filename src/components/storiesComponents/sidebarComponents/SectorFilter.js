import React, { useState, useEffect } from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import FiltersDropdown from "./FiltersDropdown";
import ListOfChosenFilterValue from "./ListOfChosenFilterValue";
import AddedFilterNotification from "./AddedFilterNotification";

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
  const [addedSector, setAddedSector] = useState("");
  const [isSectorAdded, setIsSectorAdded] = useState(false);

  useEffect(() => {
    if (addedSector) {
      setIsSectorAdded(true);
      setTimeout(() => setIsSectorAdded(false), 1000);
    }
  }, [addedSector]);

  const setSectorTermOnClick = (filterVal) => {
    setTaxonomyForSolution(filterVal);
    setSectorTerm(filterVal);
    setSectorChosen(true);
    setAddedSector(filterVal);
  };

  const setSectorTermOnEnter = (event) => {
    if (event.keyCode === 13) {
      setSectorTerm("");
      setSectorChosen(true);
    }
  };

  return (
    strategyChosen && (
      <>
        <FilterFieldContainer>
          <div id="sector-filter-header">
            <FilterLabel for="sector-filter">By Climate Sector</FilterLabel>
            {isSectorAdded ? (
              <AddedFilterNotification filterValue={addedSector} />
            ) : (
              ""
            )}
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
            filtersChosenArr={sectorsChosenArr}
            setShowChosenFilters={setShowChosenSectors}
            removeFilterValue={removeSectorValue}
            section={"Sectors"}
          />
        )}
      </>
    )
  );
};

export default SectorFilter;
