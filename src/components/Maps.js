import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import OlMap from "./mapsComponents/OlMap";
import Filters from "./mapsComponents/Filters";
import BaseMap from "./mapsComponents/BaseMapToggle";
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
  const [baseMap, setBaseMap] = useState('dark')

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
  const [searchMessage, setSearchMessage] = useState('');

  const getSimilarPlaces = async (queryParams) => {
    setIsLoadingSimilarPlaces(true);
    let features = await getGeoServerData(queryParams);
    if (features !== undefined) {
      setPlaces(features);
    }
    formatSearchString(queryParams)
    setIsLoadingSimilarPlaces(false);
  };
  const formatSearchString = (queryParams) => {
    const paramArray = queryParams.split(';');
    let populationLow = '';
    let populationHigh = '';
    let carbonLow = '';
    let carbonHigh = '';
    for (let i = 0; i < paramArray.length; i++) {
      let filterStr = paramArray[i];
      if (filterStr.includes("POPULATION_LOW:")) {
        populationLow = filterStr.split(':')[1];
      } else if (filterStr.includes("POPULATION_HIGH:")) {
        populationHigh = filterStr.split(':')[1];
      } else if (filterStr.includes("CARBON_LOW:")) {
        carbonLow = filterStr.split(':')[1];
      } else if (filterStr.includes("CARBON_HIGH:")) {
        carbonHigh = filterStr.split(':')[1];
      }
    }
    let searchString;
    if (queryParams.includes("TYPE_ID_")) {
      searchString = "Your current search is for"
      searchString += queryParams.includes("TYPE_ID_1:1") ? " States," : "";
      searchString += queryParams.includes("TYPE_ID_2:2") ? " Nations," : "";
      searchString += queryParams.includes("TYPE_ID_3:3") ? " Counties," : "";
      searchString += queryParams.includes("TYPE_ID_4:4") ? " Urban Extents," : "";
      searchString = searchString.slice(0, -1);

      searchString += ` similar to ${searchTerm}`
      searchString += populationLow != '' ? ` filtering Population between ${Math.round(populationLow).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} people` : ""
      searchString += populationHigh != '' ? ` and ${Math.round(populationHigh).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} people` : ""
      searchString += carbonLow != '' && carbonHigh != '' ? ", and" : "";
      searchString += carbonLow != '' ? ` filtering Carbon Emissions between ${carbonLow} kg/year` : ""
      searchString += carbonHigh != '' ? ` and ${carbonHigh} kg/year` : ""
    } else {
      searchString = "You at least one of the 'State', 'Nation', 'County', and 'Urban Extent' filters must be selected";
    }
    setSearchMessage(searchString);
  }
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
  useEffect(() => {
    setComparePlaceProps(null);
  }, [targetPlace]);
  return (
    <div id="maps-page">
      <OlMap mapId="map"
        places={places}
        history={history}
        targetPlace={targetPlace}
        setComparePlaceProps={setComparePlaceProps}
        baseMap={baseMap}
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
        setComparePlaceProps={setComparePlaceProps}
      />
      <MapNav />
      <BaseMap
        setBaseMap={setBaseMap}
      />
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