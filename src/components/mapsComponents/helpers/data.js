import GeoJSON from "ol/format/GeoJSON";

/**
 * Creates an OpenLayers GeoJSON formatter object then uses it
 * to create an array of Feature objects.
 */
const getGeoJson = json => {
  return new GeoJSON({
    // converts lat/long to map readable
    featureProjection: "EPSG:3857",
  }).readFeatures(json);
};

export { getGeoJson };
