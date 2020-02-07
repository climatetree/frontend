/**
 * Handles the location and contents of popups on the map.
 * @param {event} evt A single click event
 * @param {Map} map An OpenLayers Map object
 * @param {Overlay} overlay An OpenLayers Overlay object
 */
const popUpHandler = (evt, map, overlay) => {
    let pixel = evt.pixel;
    let coord = evt.coordinate;
    // Highly nested data! These are the places in an array
    let features = map.getFeaturesAtPixel(pixel);

    // Ignore clicks on map that aren't on a feature
    if (features.length === 0) {
        overlay.setPosition(undefined);
        return;
    }
    
    let places = map.getFeaturesAtPixel(pixel)[0].getProperties().features;
    let content = document.getElementById('popup-content');
    let html, place;
    if (places.length > 1) {        // This is a cluster
        html = `
            <p>
                There are ${places.length} places in this area.<br>
                Zoom in to see details.
            </p>
        `;
    } else {                        // This is a single place
        place = places[0].getProperties();
        html = `
            <p>
                Name: <strong>${place.name}</strong><br>
                Place Type: ${place.typeName}<br>
                Population: ${place.population}<br>
                Carbon: ${place.carbon}
            </p>
        `;
    }
    content.innerHTML = html;
    // TODO: Make this the center coordinate of the point, not the click
    // This should have something to do with a getGeometry call to the place variable
    overlay.setPosition(coord);
};

export { popUpHandler };