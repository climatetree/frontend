import React, { useState, useContext } from "react";
import axios from "axios";
import OlMap from "./mapsComponents/OlMap";
import Filters from "./mapsComponents/Filters";
import MapNav from "./mapsComponents/MapNav";
import UserAvatar from "./mapsComponents/UserAvatar";
import MapSignIn from "./mapsComponents/MapSignIn";
import authContext from "./context/authContext";
import "./mapsComponents/OlMap.css";
import "./Maps.css";

function Maps(props) {
  const [places, setPlaces] = useState([]);
  const [targetPlace, setTargetPlace] = useState(null);
  const [isLoadingSimilarPlaces, setIsLoadingSimilarPlaces] = useState(false);
  const [{ isLoggedIn }] = useContext(authContext);
  const getSimilarPlaces = async (placeID, filterFn = () => true) => {
    setIsLoadingSimilarPlaces(true);
    const response = await axios.get(
      `http://localhost:8080/api/places/${placeID}/similar`
    );
    setPlaces(response.data);
    setIsLoadingSimilarPlaces(false);
  };
  return (
    <div id="maps-page">
      <OlMap mapId="map" places={places} history={props.history} targetPlace={targetPlace} />
      <Filters
        getSimilarPlaces={getSimilarPlaces}
        targetPlaceID={targetPlace ? targetPlace.properties.place_id : null}
        setTargetPlace={setTargetPlace}
      />
      <MapNav />
      <div
        className={`loading-overlay${isLoadingSimilarPlaces ? " loading" : ""}`}
      >
        <p>fetching similar places for you...</p>
      </div>
      {isLoggedIn ? <UserAvatar /> : <MapSignIn />}
    </div>
  );
}

export default Maps;
