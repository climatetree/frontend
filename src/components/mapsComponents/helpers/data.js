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

const getGeoServerData = async (params) => {
  let url = 'https://climatetree-api-gateway.azurewebsites.net/geoserver/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=ClimateTree:Similar_Places&outputFormat=application/json&viewparams=' + params;
  let feats = await fetch(url, {
    method: 'GET',
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    var features = new GeoJSON({
      featureProjection: 'EPSG:3857'
    }).readFeatures(json);
    return features;
  }).catch(function (err) {
    console.error(err);
  });
  return feats;
}

const factory = (place, filters) => {
  console.log(place)
  let filter_vars = [];
  filters.forEach((filter) => {
    if (filter.apply) {
      filter_vars.push(`${filter.name.toUpperCase()}_LOW:${place.properties[filter.name] * (filter.min * 0.01)}`);
      filter_vars.push(`${filter.name.toUpperCase()}_HIGH:${place.properties[filter.name] * (filter.max * 0.01)}`);
    }
  });
  return filter_vars.join(';');
}

export { getGeoJson, getGeoServerData, factory };
