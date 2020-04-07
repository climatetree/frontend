import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import OlMap from "./mapsComponents/OlMap";
import Filters from "./mapsComponents/Filters";
import MapNav from "./mapsComponents/MapNav";
import UserAvatar from "./mapsComponents/UserAvatar";
import MapSignIn from "./mapsComponents/MapSignIn";
import StoryDashboard from './mapsComponents/StoryDashboard';
import { UserContext } from "./context/UserContext";
import { getGeoServerData } from './mapsComponents/helpers/data';
import { factory } from './mapsComponents/helpers/data';
import "./mapsComponents/OlMap.css";
import "./Maps.css";

export default function Maps() {
  const history = useHistory();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state && location.state.place ? location.state.place.properties.name : '');
  const [places, setPlaces] = useState([]);
  const [targetPlace, setTargetPlace] = useState(null);
  const [isLoadingSimilarPlaces, setIsLoadingSimilarPlaces] = useState(false);
  const [comparePlaceProps, setComparePlaceProps] = useState(null);
  const { user } = useContext(UserContext);
  const getSimilarPlaces = async (queryParams) => {
    setIsLoadingSimilarPlaces(true);
    let features = await getGeoServerData(queryParams);
    if (features !== undefined) {
      setPlaces(features);
    }
    setIsLoadingSimilarPlaces(false);
  };

  const openMapDashboard = () => {
    const mapDashboard = document.querySelector('.story-dashboard');
    if (mapDashboard) {
      mapDashboard.style.display = 'block';
      mapDashboard.style.opacity = 1;
    }
  }
  const [populationRange, setPopulationRange] = useState({
    name: 'population',
    min: 90,
    max: 150,
    apply: true,  // Only population filter is applied by default
  });
  const [carbonRange, setCarbonRange] = useState({
    name: 'carbon',
    min: 90,
    max: 110,
    apply: false,
  });
  const filterArray = [populationRange, carbonRange];
  useEffect(() => {
    if (location.state && location.state.place) {
      (async () => {
        setTargetPlace(location.state.place);
        await getSimilarPlaces(
          factory(
            location.state.place,
            filterArray
          )
        );
        openMapDashboard();
      })();
    }
  }, []);
  return (
    <div id="maps-page">
      <OlMap mapId="map"
        places={places}
        history={history}
        targetPlace={targetPlace}
        setComparePlaceProps={setComparePlaceProps}
      />
      <Filters
        getSimilarPlaces={getSimilarPlaces}
        targetPlaceID={targetPlace ? targetPlace.properties.place_id : null}
        targetPlace={targetPlace}
        setTargetPlace={setTargetPlace}
        filterArray={filterArray}
        populationRange={populationRange}
        setPopulationRange={setPopulationRange}
        carbonRange={carbonRange}
        setCarbonRange={setCarbonRange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        openMapDashboard={openMapDashboard}
      />
      <MapNav />
      <StoryDashboard
        targetPlaceProps={targetPlace ? targetPlace.properties : null}
        comparePlaceProps={comparePlaceProps}
      />
      <div
        className={`loading-overlay${isLoadingSimilarPlaces ? " loading" : ""}`}
      >
        <p>fetching similar places for you...</p>
      </div>
      {user.isLoggedIn ? <UserAvatar /> : <MapSignIn />}
    </div>
  );
}