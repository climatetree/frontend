/**
 * Filters components for the map
 */
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SuggestionDropdown from "./SuggestionDropdown";
import SuggestionOverlay from "./SuggestionOverlay";
import MinMaxRange from "./MinMaxRange";
import CheckboxGroup from "../generalComponents/CheckboxGroup";
import useDebounce from "../customHooks/useDebounce";
import { factory } from "./helpers/data";
import "./Filters.css";

export default function Filters({
  getSimilarPlaces,
  targetPlaceID,
  targetPlace,
  setTargetPlace,
  filterArray,
  populationRange,
  setPopulationRange,
  carbonRange,
  setCarbonRange,
  searchTerm,
  setSearchTerm,
  openMapDashboard,
  placeTypesEnabled,
  setPlaceTypesEnabled,
  appendPlaceTypeQuery,
  setComparePlaceProps,
}) {
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState([]);

  const handleSuggestionClick = async (placeID, name, index) => {
    setSearchTerm(name);
    if (placeID !== targetPlaceID) {
      setSelectedSuggestion([placeID, index]);
      setTargetPlace(placeSuggestions[index]);
      await getSimilarPlaces(
        appendPlaceTypeQuery(
          factory(placeSuggestions[index], filterArray),
          placeTypesEnabled
        )
      );
    }
    openMapDashboard();
  };
  const handlePlaceUpdates = () => {
    if (isSearchingSuggestions) {
      return;
    }
    if (placeSuggestions.length > 1) {
      openConfirmationPanel();
    } else if (placeSuggestions.length === 1) {
      setSearchTerm(placeSuggestions[0].properties.name);
      setSelectedSuggestion([placeSuggestions[0].properties.place_id, 0]);
      setTargetPlace(placeSuggestions[0]);
      getSimilarPlaces(factory(placeSuggestions[0], filterArray));
      document.getElementById("suggestions").style.display = "none";
    }
  };
  const openAdvancedFilters = () => {
    const advancedFilters = document.getElementById("advanced-filters");
    if (advancedFilters.style.display === "block") {
      advancedFilters.style.display = "none";
    } else {
      advancedFilters.style.display = "block";
    }
  };
  const openConfirmationPanel = () => {
    document.getElementById("suggestions").style.display = "none";
    document.getElementById("confirmation").style.display = "flex";
  };
  const closeMapDashboard = () => {
    const mapDashboard = document.querySelector(".story-dashboard");
    if (mapDashboard) {
      mapDashboard.classList.remove('active');
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
      setIsSearchingSuggestions(true);
      fetch(
        `https://climatetree-api-gateway.azurewebsites.net/places/${debouncedSearchTerm}`
      )
        .then((response) => response.json())
        .then((results) => {
          if (results.features) {
            setPlaceSuggestions(results.features);
            setSelectedSuggestion([results.features[0].properties.place_id, 0]);
          } else {
            setPlaceSuggestions([]);
            setSelectedSuggestion([]);
          }
          setIsSearchingSuggestions(false);
        });
    } else {
      closeMapDashboard();
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
            <CheckboxGroup
              label="Type"
              name="type"
              options={["STATE", "NATION", "COUNTY", "URBANEXTENT"]}
              placeTypesEnabled={placeTypesEnabled}
              setPlaceTypesEnabled={setPlaceTypesEnabled}
            />
            <div className="divisor"></div>
            <button
              onClick={() => {
                if (targetPlace) {
                  document.getElementById("advanced-filters").style.display =
                    "none";
                  setComparePlaceProps(null);
                  getSimilarPlaces(
                    appendPlaceTypeQuery(
                      factory(targetPlace, filterArray),
                      placeTypesEnabled
                    )
                  );
                }
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
