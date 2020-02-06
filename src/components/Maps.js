import React, { useState } from "react";

import OlMap from './mapsComponents/OlMap';
import { getPlacesByName } from "../services/fetchPlaces";

import '../styles/Maps.css';

const Maps = () => {
  const [searchPlace, setSearchPlaceTerm] = useState("");
  const [places, setPlaces] = useState([]);

  const whenUserInputPlace = event => {
    setSearchPlaceTerm(event.target.value);
  };

  const onSearchPlaceClick = async () => {
    const response = await getPlacesByName(searchPlace);
    setPlaces(response);
    setSearchPlaceTerm("");
  };

  return (
    <div className='MapsPage'>
      <OlMap mapId="map" />
      {/* Search Box */}
      <div id="search">
        <input
          type="text"
          style={{ color: "#000" }}
          placeholder="Enter a place"
          value={searchPlace}
          onChange={event => whenUserInputPlace(event)}
        />
        <button style={{ color: "#000" }} onClick={onSearchPlaceClick}>
          Search
        </button>
        <br></br>
        <span style={{ color: "#000" }}>{places.length}</span>
      </div>
    </div>
  );
};

export default Maps;
