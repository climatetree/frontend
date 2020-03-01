import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

/**
 * Handles the location and contents of popups on the map.
 * @param {event} evt A single click event
 * @param {Map} map An OpenLayers Map object
 * @param {Overlay} overlay An OpenLayers Overlay object
 */
const popUpHandler = (evt, map, overlay) => {
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

  const testFunc = async place => {
    const response = await axios.get(
      `https://backend-mongo-stories.azurewebsites.net/stories/place/${place.place_id}`
    );
    console.log("Response type:", typeof response.data);
    console.log("Story for this placeId:", response.data);
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
      let place = places[0].getProperties();
      return (
        <>
          <p>
            Name: <strong>{place.name}</strong>
            <br />
            Place Type: {place.typeName}
            <br />
            Population: {place.population}
            <br />
            Carbon: {place.carbon}
          </p>
          <button id="popup-btn" onClick={() => testFunc(place)}>
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

export { popUpHandler };
