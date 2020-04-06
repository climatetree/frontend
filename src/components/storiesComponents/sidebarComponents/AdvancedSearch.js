import React, { useEffect } from "react";

import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";
import "./AdvancedSearch.css";

const AdvancedSearch = ({ sideBarVisible, closeSideBar, windowWidth }) => {
  useEffect(() => document.addEventListener("keydown", closeSideBar), []);
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
