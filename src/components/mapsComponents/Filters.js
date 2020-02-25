import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CheckboxGroup from "./CheckboxGroup";
import Switch from "./Switch";
import "./Filters.css";

function Filters({
  getSimilarPlaces,
  getExactPlaces,
}) {
  const [values, setValues] = useState({
    checkboxChecked: true,
    selectRadioOption: "radio1",
    switchOn: true,
    min: "0",
    max: "",
  });
  const [placeTypesDisabled, setPlaceTypesDisabled] = useState([]);
  const [similarPlacesEnabled, setSimilarPlacesEnabled] = useState(false);
  const filterFn = place => {
    const maxValue = values.max === "" ? Number.MAX_VALUE : parseInt(values.max);
    return (
      place.population >= parseInt(values.min) &&
      place.population <= maxValue &&
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
