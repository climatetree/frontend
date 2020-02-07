import React from "react";

import OlMap from './mapsComponents/OlMap';
import Search from './mapsComponents/Search';

import '../styles/Maps.css';

const Maps = () => {
  return (
    <div id='MapsPage'>
      <OlMap mapId="map" />
      <Search />
    </div>
  );
};

export default Maps;
