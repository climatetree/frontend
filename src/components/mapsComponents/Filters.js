import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CheckboxGroup from "./CheckboxGroup";
import Switch from "./Switch";
import MinMaxRange from './MinMaxRange';
import "./Filters.css";

export default function Filters({
  getSimilarPlaces,
  getExactPlaces,
}) {
  // eslint-disable-next-line
  const [populationRange, setPopulationRange] = useState({
    min: 90,
    max: 150,
  });
  const [placeTypesDisabled, setPlaceTypesDisabled] = useState([]);
  const [similarPlacesEnabled, setSimilarPlacesEnabled] = useState(true);
  const filterFn = place => {
    return (
      // place.population >= populationRange.min * exactMatch.population / 100 &&
      // place.population <= populationRange.max * exactMatch.population / 100 &&
      !placeTypesDisabled.includes(place.typeName)
    );
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
        getExactPlaces={getExactPlaces}
        getSimilarPlaces={getSimilarPlaces}
        filters={filterFn}
        similarPlacesEnabled={similarPlacesEnabled}
      />
      <div className="filters-wrapper">
        <div className="similar-places-filter">
          <Switch
            label="Enable similar places"
            name="similar-places"
            on={similarPlacesEnabled}
            onChange={(value) => setSimilarPlacesEnabled(value)}
          />
        </div>
        <div className="advanced-filters-wrapper">
          <p onClick={openAdvancedFilters}>More</p>
          <div id="advanced-filters">
            <CheckboxGroup
              label="Type Name"
              name="typeName"
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
          </div>
        </div>
      </div>
    </div>
  );
};