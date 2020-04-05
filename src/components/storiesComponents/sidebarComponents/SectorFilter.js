import React, { useEffect, useState } from "react";

import useDebounceFilter from "../helper/useDebounceFilter";
import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import SectorDropdown from "./SectorDropdown";

import "./SectorFilter.css";

const SectorFilter = () => {
  const [sectorTerm, setSectorTerm] = useState("");
  const debouncedSolutionTerm = useDebounceFilter(sectorTerm, 1000);

  useEffect(() => {
    if (debouncedSolutionTerm) {
    } else {
      console.log("Hello!!!");
    }
  }, [debouncedSolutionTerm]);

  return (
    <FilterFieldContainer>
      <FilterLabel for="sector-filter">By Sector</FilterLabel>
      <input
        id="sector-filter"
        className="filter-btn"
        placeholder="Enter a sector"
        value={sectorTerm}
        onChange={(e) => setSectorTerm(e.target.value)}
        onFocus={() => {
          document.getElementById("sector-dropdown-container").style.display =
            "block";
        }}
        onBlur={() => {
          document.getElementById("sector-dropdown-container").style.display =
            "none";
        }}
      />
      <SectorDropdown debouncedFilterTerm={debouncedSolutionTerm} />
    </FilterFieldContainer>
  );
};

export default SectorFilter;
