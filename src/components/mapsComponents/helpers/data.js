import GeoJSON from "ol/format/GeoJSON";

/**
 * Converts JSON data into GeoJSON for rendering in a map.
 * @param {Object} jsonData JSON with the following fields:
 *      placeId, name, typeName, population, carbon, percapcarb,
 *      popdensity, pointX, pointY.
 */
const jsonToGeoJson = jsonData => {
  // GeoJSON starter object
  let geoData = {
    type: "FeatureCollection",
    features: [],
  };

  // Parse JSON into GeoJSON for OL compatibility
  jsonData.forEach(place => {
    // Extract lat/long
    let lat = place["pointY"];
    let long = place["pointX"];

    // Convert to GeoJSON
    geoData.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [long, lat],
      },
      properties: {
        placeId: place["placeId"],
        name: place["name"],
        typeName: place["typeName"],
        population: place["population"],
        carbon: place["carbon"],
        percapcarb: place["percapcarb"],
        popdensity: place["popdensity"],
      },
    });
  });

  return geoData;
};

/**
 * Creates an OpenLayers GeoJSON formatter object then uses it
 * to create an array of Feature objects.
 */
const getGeoJson = json => {
  return new GeoJSON({
    // converts lat/long to map readable
    featureProjection: "EPSG:3857",
  }).readFeatures(jsonToGeoJson(json));
};

export { jsonToGeoJson, getGeoJson };
