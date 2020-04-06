import React, { useEffect, useState } from "react";

import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";
import useDebounceFilter from "../helper/useDebounceFilter";
import "./AdvancedSearch.css";

const AdvancedSearch = ({ sideBarVisible, closeSideBar, windowWidth }) => {
  const [solutionTerm, setSolutionTerm] = useState("");
  const [sectorTerm, setSectorTerm] = useState("");

  const debouncedSolutionTerm = useDebounceFilter(solutionTerm, 500);
  const debouncedSectorTerm = useDebounceFilter(sectorTerm, 500);

  console.log("Sector", debouncedSectorTerm);
  console.log("Solution", debouncedSolutionTerm);

  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);
  }, []);

  const escapeButtonPress = (event) => {
    if (event.keyCode === 27) {
      closeSideBar();
    }
  };

  return (
    <div
      id="advanced-search-container"
      className={sideBarVisible ? "unhide-filters" : "hide-filters"}
    >
      <div id="btn-filter-container">
        <span id="title-as">Filters</span>
        <button
          id="apply-filters"
          onClick={() => {
            if (windowWidth < 951) {
              closeSideBar();
            }
          }}
        >
          Apply Filters
        </button>
      </div>

      <div id="filters">
        <SolutionFilter />
        <SectorFilter />
        <StrategyFilter />
      </div>
    </div>
  );
};

export default AdvancedSearch;
