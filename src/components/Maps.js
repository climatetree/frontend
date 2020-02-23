import React, { useState } from "react";
import axios from "axios";
import OlMap from "./mapsComponents/OlMap";
import Filters from "./mapsComponents/Filters";
import Places from "./mapsComponents/Places";
import MapNav from './mapsComponents/MapNav';
import UserAvatar from './mapsComponents/UserAvatar';
import MapLogIn from './mapsComponents/MapLogIn';
import "../styles/Maps.css";
import "./mapsComponents/OlMap.css";

function Maps() {
  // const [mapStates, setMapStates] = useState({
  //   term: "",
  //   placeId: "",
  //   places: [],
  // });
  const [places, setPlaces] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getExactPlaces = async (placeName, filterFn = () => true) => {
    const response = await axios.get(`https://places-postgres2.azurewebsites.net/api/names/${placeName}`);
    // setMapStates({
    //   ...mapStates,
    //   places: response.data.filter(filterFn),
    // });
    setPlaces(response.data.filter(filterFn));
  };
  const getSimilarPlaces = async (placeID, filterFn = () => true) => {
    const response = await axios.get(`https://places-postgres2.azurewebsites.net/api/places/${placeID}/similar`);
    // setMapStates({
    //   ...mapStates,
    //   places: response.data.filter(filterFn),
    // });
    setPlaces(response.data.filter(filterFn));
  };
  return (
    <div id="maps-page">
      <OlMap mapId="map" places={places} />
      <Filters
        getExactPlaces={getExactPlaces}
        getSimilarPlaces={getSimilarPlaces}
      />
      <Places places={places} />
      <MapNav />
      {isLoggedIn ? (
        <UserAvatar />
      ) : (
        <MapLogIn />
      )}
      <UserAvatar />
    </div>
  );
}

export default Maps;
