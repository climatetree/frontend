import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SuggestionDropdown from './SuggestionDropdown';
import SuggestionOverlay from './SuggestionOverlay';
import CheckboxGroup from "./CheckboxGroup";
import MinMaxRange from './MinMaxRange';
import useDebounce from "./helpers/useDebounce";
import "./Filters.css";

export default function Filters({
  getSimilarPlaces,
  targetPlaceID,
  setTargetPlace,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState([]);

  const [populationRange, setPopulationRange] = useState({
    min: 90,
    max: 150,
  });
  const [carbonRange, setCarbonRange] = useState({
    min: 90,
    max: 110,
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
  const handleSuggestionClick = (placeID, name, index) => {
    setSearchTerm(name);
    if (placeID !== targetPlaceID) {
      setSelectedSuggestion([placeID, index]);
      setTargetPlace(placeSuggestions[index]);
      getSimilarPlaces(placeID, filterFn);
    }
  };
  const openConfirmationPanel = () => {
    document.getElementById('suggestions').style.display = 'none';
    document.getElementById('confirmation').style.display = 'flex';
  }
  const handlePlaceUpdates = () => {
    if (isSearchingSuggestions) {
      return;
    }
    if (placeSuggestions.length > 1) {
      openConfirmationPanel();
    } else if (placeSuggestions.length === 1) {
      setSearchTerm(placeSuggestions[0].properties.name);
      setSelectedSuggestion([
        placeSuggestions[0].properties.place_id,
        0,
      ]);
      setTargetPlace(placeSuggestions[0]);
      getSimilarPlaces(
        placeSuggestions[0].properties.place_id,
        filterFn
      );
      document.getElementById('suggestions').style.display = 'none';
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
      setIsSearchingSuggestions(true);
      fetch(
        `https://climatetree-api-gateway.azurewebsites.net/places/${debouncedSearchTerm}`
      )
        .then(response => response.json())
        .then(results => {
          if (results.features) {
            setPlaceSuggestions(results.features);
            setSelectedSuggestion([
              results.features[0].properties.place_id,
              0,
            ]);
          } else {
            setPlaceSuggestions([]);
            setSelectedSuggestion([]);
          }
          setIsSearchingSuggestions(false);
        });
    } else {
      setPlaceSuggestions([]);
      setSelectedSuggestion([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="map-search-wrapper">
      <div id="search-bar">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handlePlaceUpdates={handlePlaceUpdates}
        />
        <SuggestionDropdown
          debouncedSearchTerm={debouncedSearchTerm}
          isSearchingSuggestions={isSearchingSuggestions}
          placeSuggestions={placeSuggestions}
          selectedSuggestion={selectedSuggestion}
          handleSuggestionClick={handleSuggestionClick}
        />
        <SuggestionOverlay
          placeSuggestions={placeSuggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      </div>
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
            <div className="divisor"></div>
            <MinMaxRange
              label="Carbon (%)"
              name="carbon"
              range={carbonRange}
              setRange={setCarbonRange}
            />
            <div className="divisor"></div>
            <button onClick={() => {
              document.getElementById('advanced-filters').style.display = 'none';
              handlePlaceUpdates();
            }}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};