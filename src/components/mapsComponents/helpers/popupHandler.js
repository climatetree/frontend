import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

/**
 * Handles the location and contents of popups on the map.
 * @param {event} evt A single click event
 * @param {Map} map An OpenLayers Map object
 * @param {Overlay} overlay An OpenLayers Overlay object
 * @param {Object} history Session history
 * @param {Object} targetPlace Info about the place last searched
 */
export const popUpHandler = (
  evt,
  map,
  overlay,
  history,
  targetPlace,
  setComparePlaceProps
) => {
  // Get list of features
  let pixel = evt.pixel;
  let features = map.getFeaturesAtPixel(pixel);

  // Ignore clicks on map that aren't on a feature
  if (features.length === 0) {
    overlay.setPosition(undefined);
    return;
  }

  // Get places contained in the feature list
  let featureList = map.getFeaturesAtPixel(pixel);
  let places = [];
  if (featureList.length === 1) {
    // Use the first element in the list if the place is not
    // the targetPlace.
    places = featureList[0].getProperties().features;
  } else {
    // If the place is the target place, there will be more than
    // one element due to the combination of the main places layer
    // and the target place layer. The feature from the target
    // place layer will be the first element in the featuresList
    // and will cause an error if clicked on because it is not
    // a clustered layer and has no features property.
    places = featureList[1].getProperties().features;
  }

  // Set a div for popup content
  // Due to OL library, this needs to be done on the actual DOM
  let content = document.getElementById("popup-content");
  content.innerHTML = `<div id="popup-html"></div>`;

  const goToStories = async place => {
    const response = await axios.get(
      `https://climatetree-api-gateway.azurewebsites.net/stories/place/${place.place_id}`
    );

    history.push({
      pathname: "/stories",
      search: `?place_id=${place.place_id}&place_name=${place.name}`,
      state: { storiesResult: response.data, placeName: place.name }
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
      setComparePlaceProps(placeProps);

      return (
        <>
          <p>
            <strong>{placeProps.name}</strong> -{" "}
            <small>{placeProps.type_name}</small>
          </p>
          <button id="popup-btn" onClick={() => goToStories(placeProps)}>
            View Stories
          </button>
        </>
      );
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
export function percentiStringify(targetPlaceNum, currentPlaceNum) {
  let percent = 100;
  let ratio = currentPlaceNum / targetPlaceNum;
  // example: 110% becomes +10%, 90% becomes -10%
  let relativePercent = Math.floor(ratio * percent - percent);
  if (relativePercent >= 0) {
    return `+${relativePercent}%`;
  } else {
    return `${relativePercent}%`;
  }
}
