import GeoJSON from "ol/format/GeoJSON";
// TODO: Delete
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

const getGeoServerData = (params) => {
  let url = 'https://climatetree-geoserver.azurewebsites.net/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=ClimateTree:Similar_Places&outputFormat=application/json&viewparams=' + params;
  console.log(url);
  fetch(url, {
    method: 'GET',
    // body: new XMLSerializer().serializeToString(featureRequest)
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json);
    var features = new ol.format.GeoJSON().readFeatures(json, {
      featureProjection: 'EPSG:3857'
    });
    return features;
  }).catch(function (err) {
    console.error(err);
  });
}

const factory = (place, filters) => {
  let filter_vars = [];
  //console.log(place);
  filters.forEach((filter) => {
    filter_vars.push(`${filter.name.toUpperCase()}_LOW:${place.properties[filter.name] * (filter.min * 0.01)}`);
    filter_vars.push(`${filter.name.toUpperCase()}_HIGH:${place.properties[filter.name] * (filter.max * 0.01)}`);
  });
  return filter_vars.join(';');
}

export { getGeoJson, getGeoServerData, factory };
