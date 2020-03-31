import React, { useState, useContext } from "react";
import OlMap from "./mapsComponents/OlMap";
import Filters from "./mapsComponents/Filters";
import MapNav from "./mapsComponents/MapNav";
import UserAvatar from "./mapsComponents/UserAvatar";
import MapSignIn from "./mapsComponents/MapSignIn";
import { UserContext } from "./context/UserContext";
import { getGeoServerData } from './mapsComponents/helpers/data';
import "./mapsComponents/OlMap.css";
import "./Maps.css";

export default function Maps(props) {
  const [places, setPlaces] = useState([]);
  const [targetPlace, setTargetPlace] = useState(null);
  const [isLoadingSimilarPlaces, setIsLoadingSimilarPlaces] = useState(false);
  const { user } = useContext(UserContext);
  const getSimilarPlaces = async (queryParams) => {
    setIsLoadingSimilarPlaces(true);
    let features = await getGeoServerData(queryParams);
    if (features !== undefined) {
      setPlaces(features);
    }
    setIsLoadingSimilarPlaces(false);
  };
  return (
    <div id="maps-page">
      <OlMap mapId="map"
        places={places}
        history={props.history}
        targetPlace={targetPlace}
      />
      <Filters
        getSimilarPlaces={getSimilarPlaces}
        targetPlaceID={targetPlace ? targetPlace.properties.place_id : null}
        targetPlace={targetPlace}
        setTargetPlace={setTargetPlace}
      />
      <MapNav />
      <div
        className={`loading-overlay${isLoadingSimilarPlaces ? " loading" : ""}`}
      >
        <p>fetching similar places for you...</p>
      </div>
      {user.isLoggedIn ? <UserAvatar /> : <MapSignIn />}
    </div>
  );
}