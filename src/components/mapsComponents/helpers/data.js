import GeoJSON from 'ol/format/GeoJSON';

// TODO: take a URL and fetch API data
const getData = () => {
    // Pretend this comes from an API
    let data = [
        {
            "placeId": 1,
            "name": "Manus",
            "typeName": "COUNTRY",
            "population": 32,
            "carbon": 0.010221047,
            "percapcarb": 4.5E-9,
            "popdensity": 276559.5484,
            "pointX": 146.9123013,
            "pointY": -2.088797733,

        },
        {
            "placeId": 2,
            "name": "Papua New Guinea",
            "typeName": "COUNTRY",
            "population": 33,
            "carbon": 0.010221047,
            "percapcarb": 4.5E-9,
            "popdensity": 276559.5484,
            "pointX": 145.8584213,
            "pointY": -6.757976652,
        },
        {
            "placeId": 3,
            "name": "Manta",
            "typeName": "COUNTY",
            "population": 238423,
            "carbon": 0.010221047,
            "percapcarb": 4.5E-9,
            "popdensity": 276559.5484,
            "pointX": -80.80383859,
            "pointY": -1.026975912,
        },
        {
            "placeId": 4,
            "name": "Manastiur",
            "typeName": "COUNTY",
            "population": 33,
            "carbon": 0.010221047,
            "percapcarb": 4.5E-9,
            "popdensity": 276559.5484,
            "pointX": 22.05331191,
            "pointY": 45.86671945,
        },
    ];
    return data;
}

const getData2 = () => {
    let data = [
        {
            "placeId": 1,
            "name": "Manus",
            "typeName": "COUNTRY",
            "population": 32,
            "carbon": 0.010221047,
            "percapcarb": 4.5E-9,
            "popdensity": 276559.5484,
            "pointX": 146.9123013,
            "pointY": -2.088797733,

        },
        {
            "placeId": 2,
            "name": "Papua New Guinea",
            "typeName": "COUNTRY",
            "population": 33,
            "carbon": 0.010221047,
            "percapcarb": 4.5E-9,
            "popdensity": 276559.5484,
            "pointX": 145.8584213,
            "pointY": -6.757976652,
        },
    ]
    return data;
}

/**
 * Converts JSON data into GeoJSON for rendering in a map.
 * @param {Object} jsonData JSON with the following fields: 
 *      placeId, name, typeName, population, carbon, percapcarb,
 *      popdensity, pointX, pointY.
 */
const jsonToGeoJson = (jsonData) => {
    // GeoJSON starter object
    let geoData = {
        'type': 'FeatureCollection',
        'features': [],
    };

    // Parse JSON into GeoJSON for OL compatibility
    jsonData.forEach(place => {
        // Extract lat/long
        let lat = place["pointY"];
        let long = place["pointX"];

        // Convert to GeoJSON
        geoData.features.push({
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [long, lat],
            },
            'properties': {
                'placeId': place["placeId"],
                'name': place["name"],
                'typeName': place["typeName"],
                'population': place["population"],
                'carbon': place["carbon"],
                'percapcarb': place["percapcarb"],
                'popdensity': place["popdensity"],
            },
        });
    });

    return geoData;
}

/**
 * Creates an OpenLayers GeoJSON formatter object then uses it
 * to create an array of Feature objects.
 */
const getGeoJson = (json) => {
    return (new GeoJSON({
        // converts lat/long to map readable
        featureProjection: 'EPSG:3857',
    })).readFeatures(jsonToGeoJson(json));
}

export { getData, getData2, jsonToGeoJson, getGeoJson };