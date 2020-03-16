import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Handles the location and contents of popups on the map.
 * @param {event} evt A single click event
 * @param {Map} map An OpenLayers Map object
 * @param {Overlay} overlay An OpenLayers Overlay object
 * @param {Object} history Session history
 * @param {Object} targetPlace Info about the place last searched
 */
const popUpHandler = (evt, map, overlay, history, targetPlace) => {
  // Get list of features
  let pixel = evt.pixel;
  let features = map.getFeaturesAtPixel(pixel);

  // Ignore clicks on map that aren't on a feature
  if (features.length === 0) {
    overlay.setPosition(undefined);
    return;
  }

  // Get places contained in the feature list
  let places = map.getFeaturesAtPixel(pixel)[0].getProperties().features;

  // Set a div for popup content
  // Due to OL library, this needs to be done on the actual DOM
  let content = document.getElementById("popup-content");
  content.innerHTML = `<div id="popup-html"></div>`;

  const goToStories = place => {
    history.push({
      pathname: "/stories",
      search: `?place_id=${place.place_id}`,
      state: { placeName: place.name }
    });
  };

  const PopupContent = () => {
    if (places.length > 1) {
      // Cluster popup
      return (
        <>
          <p>
            There are {places.length} places in this area.
            <br />
            Zoom in to see details.
          </p>
        </>
      );
    } else {
      // Single place popup
      let placeProps = places[0].getProperties();
      let targetProps = targetPlace.properties;

      // Is target place?
      if (targetProps.name === placeProps.name) {
        // Shows actual statistic numbers
        return (
          <>
            <p>
              <strong>{placeProps.name}</strong> - {placeProps.type_name}
              <br />
              Population: {Math.floor(placeProps.population)}
              <br />
              Population Density: {placeProps.popdensity}
              <br />
              Carbon: {placeProps.carbon}
              <br />
              Carbon Per Capita: {placeProps.percapcarb}
              <br />
            </p>
            <button id="popup-btn" onClick={() => goToStories(placeProps)}>
              View Stories
          </button>
          </>
        );
      } else {
        // Is not target place => show relative percentages
        return (
          <>
            <p>
              <strong>{placeProps.name}</strong> - {placeProps.type_name}
              <br />
              Population: {percentiStringify(targetProps.population, placeProps.population)}
              <br />
              Population Density: {percentiStringify(targetProps.popdensity, placeProps.popdensity)}
              <br />
              Carbon: {percentiStringify(targetProps.carbon, placeProps.carbon)}
              <br />
              Carbon Per Capita: {percentiStringify(targetProps.percapcarb, placeProps.percapcarb)}
              <br />
            </p>
            <button id="popup-btn" onClick={() => goToStories(placeProps)}>
              View Stories
          </button>
          </>
        );
      }
    }
  };

  // Render the popup content
  ReactDOM.render(<PopupContent />, document.getElementById("popup-html"));

  // Set the popup location to the coordinates of the point
  let coord = features[0].getProperties().geometry.flatCoordinates;
  overlay.setPosition(coord);
};

/**
 * Calculates a relative percentage for places statistics shown
 * on a popup. For clarity in the above code, returns a string depiction
 * of the resulting percentage.
 * @param {Object} targetPlaceNum A number statistic from the place last searched for
 * @param {Object} currentPlaceNum A number statistic from the place this popup refers to
 */
function percentiStringify(targetPlaceNum, currentPlaceNum) {
  let percent = 100;
  let ratio = currentPlaceNum / targetPlaceNum;
  // example: 110% becomes +10%, 90% becomes -10%
  let relativePercent = Math.floor((ratio * percent) - percent);
  if (relativePercent >= 0) {
    return `+${relativePercent}%`;
  } else {
    return `${relativePercent}%`;
  }
}

export default popUpHandler;
