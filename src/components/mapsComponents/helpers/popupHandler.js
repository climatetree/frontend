import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

/**
 * Handles the location and contents of popups on the map.
 * @param {event} evt A single click event
 * @param {Map} map An OpenLayers Map object
 * @param {Overlay} overlay An OpenLayers Overlay object
 * @param {Object} history Session history
 */
export const popUpHandler = (
  evt,
  map,
  overlay,
  history,
  setComparePlaceProps
) => {
  // Get list of features
  let pixel = evt.pixel;
  let features = map.getFeaturesAtPixel(pixel);

  // Get places contained in area of click
  let places = [];
  if (!features || features.length === 0) {
    // No features => close any open popups and return
    overlay.setPosition(undefined);
    return;
  } else if (features.length === 1) {
    // Use the first element in the list if the place is not
    // the targetPlace.
    places = features[0].getProperties().features;
  } else {
    // If the place is the target place, there will be more than
    // one element due to the combination of the main places layer
    // and the target place layer. The feature from the target
    // place layer will be the first element in the featuresList
    // and will cause an error if clicked on because it is not
    // a clustered layer and has no features property.
    places = features[1].getProperties().features;
  }

  // Set a div for popup content
  // Due to OL library, this needs to be done on the actual DOM
  let content = document.getElementById("popup-content");
  content.innerHTML = `<div id="popup-html"></div>`;

  const PopupContent = () => {
    if (places.length > 1) {
      // Cluster popup
      return (
        <>
          <p>
            {/* Non-breaking spaces are to ensure popups are appropriate width */}
            {places.length}&nbsp;places&nbsp;here.
            <br />
            Zoom&nbsp;for&nbsp;details.
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
            <strong>{placeProps.name}</strong>&nbsp;-&nbsp;
            <small>{placeProps.type_name}</small>
            <button id="popup-btn" onClick={() => goToStories(placeProps, history)}>
              View Stories
          </button>
          </p>
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

/**
 * Redirect user to view stories from this place.
 * @param {Object} place The place to view stories from
 * @param {Object} history Session history
 */
export async function goToStories(place, history) {
  const response = await axios.get(
    `https://climatetree-api-gateway.azurewebsites.net/stories/place/${place.place_id}`
  );

  history.push({
    pathname: "/stories",
    search: `?place_id=${place.place_id}&place_name=${place.name}`,
    state: { storiesResult: response.data, placeName: place.name }
  });
};