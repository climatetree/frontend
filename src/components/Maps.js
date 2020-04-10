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
  const { user } = useContext(UserContext);

  // General State
  const [comparePlaceProps, setComparePlaceProps] = useState(null);
  const [isLoadingSimilarPlaces, setIsLoadingSimilarPlaces] = useState(false);
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState(location.state && location.state.place ? location.state.place.properties.name : '');
  const [targetPlace, setTargetPlace] = useState(null);

  // Filter State
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
  const [placeTypesEnabled, setPlaceTypesEnabled] = useState(['STATE', 'NATION', 'COUNTY', 'URBANEXTENT']);
  const filterArray = [populationRange, carbonRange];

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
      mapDashboard.classList.add('active');
    }
  }

  const appendPlaceTypeQuery = (query, placeTypesEnabled) => {
    let result = [query];
    for (const placeType of placeTypesEnabled) {
      if (placeType === 'STATE') {
        result.push('TYPE_ID_1:1');
      } else if (placeType === 'NATION') {
        result.push('TYPE_ID_2:2');
      } else if (placeType === 'COUNTY') {
        result.push('TYPE_ID_3:3');
      } else if (placeType === 'URBANEXTENT') {
        result.push('TYPE_ID_4:4');
      }
    }
    return result.join(';');
  }
  useEffect(() => {
    if (location.state && location.state.place) {
      (async () => {
        setTargetPlace(location.state.place);
        await getSimilarPlaces(
          appendPlaceTypeQuery(
            factory(
              location.state.place,
              filterArray
            ),
            placeTypesEnabled
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
        placeTypesEnabled={placeTypesEnabled}
        setPlaceTypesEnabled={setPlaceTypesEnabled}
        appendPlaceTypeQuery={appendPlaceTypeQuery}
      />
      <MapNav />
      <StoryDashboard
        targetPlaceProps={targetPlace ? targetPlace.properties : null}
        comparePlaceProps={comparePlaceProps}
        history={history}
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