import React, { useState } from "react";
import axios from "axios";
import OlMap from "./mapsComponents/OlMap";
import Filters from "./mapsComponents/Filters";
import Nav from "./Nav";
import Places from "./mapsComponents/Places";
import "../styles/Maps.css";
import "./mapsComponents/OlMap.css";

function Maps() {
  const [mapStates, setMapStates] = useState({
    term: "",
    placeId: "",
    places: [],
    dropdownPlaces: [],
  });
  const [navHidden, setNavHidden] = useState(true);
  const getPlacesDropdownAPICall = async term => {
    if (term.length > 2) {
      const response = await axios.get(
        `https://places-postgres.azurewebsites.net/api/names/${term}`
      );
      setMapStates({
        ...mapStates,
        dropdownPlaces: filterPlacesForDropdown(response),
      });
      return term;
    }
  };
  const filterPlacesForDropdown = responseObject => {
    const arr = responseObject.data.map(place => {
      return { label: place.name, value: place.placeId };
    });
    return arr;
  };
  const getSimilarPlacesAPICall = async (id, filterFn = () => true) => {
    const response = await axios.get(
      `https://places-postgres.azurewebsites.net/api/places/${Number(
        id
      )}/similar`
    );
    setMapStates({
      ...mapStates,
      places: response.data.filter(filterFn),
    });
  };
  const button = () => {
    if (navHidden) {
      return (
        <button
          id="shownav"
          style={{ top: "0" }}
          onClick={() => setNavHidden(false)}
        >
          <sup className="menu-toggle-icon">▼</sup>
        </button>
      );
    } else {
      return (
        <button
          id="shownav"
          style={{ top: "5rem" }}
          onClick={() => setNavHidden(true)}
        >
          <sup className="menu-toggle-icon">▲</sup>
        </button>
      );
    }
  };
  return (
    <div id="maps-page">
      {button()}
      <Nav hidden={navHidden} />
      <OlMap mapId="map" places={mapStates.places} />
      <Filters
        term={mapStates.term}
        placeId={mapStates.placeId}
        getPlacesForDropdown={getPlacesDropdownAPICall}
        getSimilarPlaces={getSimilarPlacesAPICall}
        dropdownPlaces={mapStates.dropdownPlaces}
        navHidden={navHidden}
      />
      <Places places={mapStates.places} />
    </div>
  );
}

export default Maps;
