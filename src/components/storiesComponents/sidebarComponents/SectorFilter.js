import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import "./SectorFilter.css";

const SectorFilter = () => {
  return (
    <FilterFieldContainer>
      <FilterLabel for="sector-filter">By Sector</FilterLabel>
      <input
        id="sector-filter"
        className="filter-btn"
        placeholder="Enter a sector"
      />
    </FilterFieldContainer>
  );
};

export default SectorFilter;
