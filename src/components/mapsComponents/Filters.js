import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CheckboxGroup from "./CheckboxGroup";
import MinMaxRange from './MinMaxRange';
import "./Filters.css";

export default function Filters({
  getSimilarPlaces,
  targetPlaceID,
  setTargetPlace,
}) {
  const [populationRange, setPopulationRange] = useState({
    min: 90,
    max: 150,
  });
  const [placeTypesDisabled, setPlaceTypesDisabled] = useState([]);
  const filterFn = ({ properties }) => {
    return !placeTypesDisabled.includes(properties.type_name);
  };
  const openAdvancedFilters = () => {
    const advancedFilters = document.getElementById('advanced-filters');
    if (advancedFilters.style.display === 'block') {
      advancedFilters.style.display = 'none';
    } else {
      advancedFilters.style.display = 'block';
    }
  };
  return (
    <div className="map-search-wrapper">
      <SearchBar
        getSimilarPlaces={getSimilarPlaces}
        filters={filterFn}
        targetPlaceID={targetPlaceID}
        setTargetPlace={setTargetPlace}
      />
      <div className="filters-wrapper">
        <div className="advanced-filters-wrapper">
          <p onClick={openAdvancedFilters}>Advanced Search</p>
          <div id="advanced-filters">
            <CheckboxGroup
              label="Type Name"
              name="type_name"
              placeTypesDisabled={placeTypesDisabled}
              setPlaceTypesDisabled={setPlaceTypesDisabled}
            />
            <div className="divisor"></div>
            <MinMaxRange
              label="Population (%)"
              name="population"
              range={populationRange}
              setRange={setPopulationRange}
            />
            {/* <button>Apply</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};