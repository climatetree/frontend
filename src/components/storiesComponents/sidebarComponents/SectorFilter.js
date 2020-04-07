import React, { useEffect, useState } from "react";
import axios from "axios";

import useDebounceFilter from "../helper/useDebounceFilter";
import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
// import SectorDropdown from "./SectorDropdown";
import FiltersDropdown from "./FiltersDropdown";

import "./SectorFilter.css";

const SectorFilter = () => {
  const [sectors, setSectors] = useState([]);
  const [sectorTerm, setSectorTerm] = useState("");
  const [isSectorSearching, setIsSectorSearching] = useState(false);

  const debouncedSectorTerm = useDebounceFilter(sectorTerm, 500);

  useEffect(() => {
    (async () => {
      if (debouncedSectorTerm) {
        // API call
        setIsSectorSearching(true);
        const response = await axios.get(
          `https://backend-mongo-stories.azurewebsites.net/stories/all/sector/${debouncedSectorTerm}`
        );

        setSectors(response.data);
        setIsSectorSearching(false);
      } else {
        setSectors([]);
      }
    })();
  }, [debouncedSectorTerm]);

  const setSectorTermOnClick = (sol) => {
    setSectorTerm(sol);
  };

  const setSectorTermOnEnter = (sol, event) => {
    if (event.keyCode === 13) {
      setSectorTerm(sol);
    }
  };

  return (
    <FilterFieldContainer>
      <FilterLabel for="sector-filter">By Sector</FilterLabel>
      <input
        id="sector-filter"
        className="filter-btn"
        placeholder="Enter a sector"
        disabled
        style={{ backgroundColor: "#ababab" }}
        value={sectorTerm}
        onChange={(e) => setSectorTerm(e.target.value)}
        onFocus={() => {
          document.querySelector(".sector-dropdown-container").style.display =
            "block";
        }}
        onBlur={() => {
          setTimeout(() => {
            document.querySelector(".sector-dropdown-container").style.display =
              "none";
          }, 100);
        }}
      />
      <FiltersDropdown
        debouncedFilterTerm={debouncedSectorTerm}
        results={sectors}
        isSearching={isSectorSearching}
        setTermOnClick={setSectorTermOnClick}
        setTermOnEnter={setSectorTermOnEnter}
        status="sector"
      />
    </FilterFieldContainer>
  );
};

export default SectorFilter;
