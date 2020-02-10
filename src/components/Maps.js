import React, { useState } from "react";
import axios from "axios";
import OlMap from "./mapsComponents/OlMap";
import Search from "./mapsComponents/Search";
import { getData, getGeoJson } from "./mapsComponents/helpers/data";
import "../styles/Maps.css";

import Filters from './mapsComponents/Filters';
import './mapsComponents/OlMap.css';

function Maps() {
  const [mapStates, setMapStates] = useState({
    term: '',
    places: [],
  });
  const handleSearch = (term) => {
    const places = getGeoJson(getData());
    setMapStates({
      term,
      places,
    });
    //     return axios
    //       .get(`https://places-postgres.azurewebsites.net/api/names/${search}`)
    //       .then(resp => this.setState({ places: resp.data }));
  };
  return (
    <div id="maps-page">
      <OlMap
        mapId="map"
        places={mapStates.places}
        term={mapStates.term}
      />
      <Filters
        onSearch={handleSearch}
      />
    </div>
  ); 
}

export default Maps;
