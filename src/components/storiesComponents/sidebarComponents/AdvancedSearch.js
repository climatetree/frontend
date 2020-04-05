import React from "react";

import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";
import "./AdvancedSearch.css";

const AdvancedSearch = () => {
  return (
    <div id="advanced-search-container">
      <div id="btn-filter-container">
        <span id="title-as">Filters</span>
        <button id="apply-filters">Apply Filters</button>
      </div>

      <SolutionFilter />
      <SectorFilter />
      <StrategyFilter />
    </div>
  );
};

export default AdvancedSearch;
