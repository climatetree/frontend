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
    places: [],
  });
  const handleSearch = async (term, filterFn = () => true) => {
    const response = await axios.get(`https://places-postgres.azurewebsites.net/api/names/${term}`);
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
        onSearch={handleSearch}
      />
      <Places
        places={mapStates.places}
      />
    </div>
  ); 
}

export default Maps;
