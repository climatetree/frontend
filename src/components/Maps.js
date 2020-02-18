import React, { useState } from "react";
import axios from "axios";
import OlMap from "./mapsComponents/OlMap";
import Filters from './mapsComponents/Filters';
import Places from './mapsComponents/Places';
import "../styles/Maps.css";
import './mapsComponents/OlMap.css';


function Maps() {
  const [mapStates, setMapStates] = useState({
    term: '',
    placeId: '',
    places: [],
    dropdownPlaces: []
  });
  const getPlacesDropdownAPICall = async (term) => {
    if (term.length > 2) {
      const response = await axios.get(`https://places-postgres.azurewebsites.net/api/names/${term}`);
      setMapStates({...mapStates, dropdownPlaces: filterPlacesForDropdown(response)});
      return term;
    }
  }
  const filterPlacesForDropdown = (responseObject) => {
    const arr = responseObject.data.map((place) => {
      return {label: place.name, value: place.placeId};
    })
    return arr;
  }
  const getSimilarPlacesAPICall = async (id, filterFn = () => true) => {
    const response = await axios.get(`https://places-postgres.azurewebsites.net/api/places/${Number(id)}/similar`);
    setMapStates({
      ...mapStates,
      places: response.data.filter(filterFn),
    });
  }
  return (
    <div id="maps-page">
      <OlMap
        mapId="map"
        places={mapStates.places}
      />
      <Filters
        term={mapStates.term}
        placeId={mapStates.placeId}
        getPlacesForDropdown={getPlacesDropdownAPICall}
        getSimilarPlaces={getSimilarPlacesAPICall}
        dropdownPlaces = {mapStates.dropdownPlaces}
      />
      <Places
        places={mapStates.places}
      />
    </div>
  ); 
}

export default Maps;
