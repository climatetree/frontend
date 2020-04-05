import React from "react";

import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";
import "./AdvancedSearch.css";

const AdvancedSearch = () => {
  return (
    <div id="advanced-search-container">
      <h3 id="title-as">Filters</h3>
      <SolutionFilter />
      <SectorFilter />
      <StrategyFilter />
      <div id="btn-filter-container">
        <button id="apply-filters">Apply Filters</button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
