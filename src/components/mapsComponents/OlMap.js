import React, { useEffect } from 'react';

import 'ol/ol.css';
import { Map, View } from 'ol';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';

import getStyles from './helpers/olStyles';
import { getData, jsonToGeoJson } from './helpers/data';

const OlMap = (props) => {
    // OpenLayers code to render the map
    useEffect(() => {
        /* Mapping Logic*/

        // Enable clustering for points
        let clusterDist = 20;
        let clusterSource = new Cluster({
            // Data
            source: new VectorSource({
                // Extract features from GeoJSON data
                features: (new GeoJSON({
                    // converts lat/long to map readable
                    featureProjection: 'EPSG:3857',
                })).readFeatures(jsonToGeoJson(getData())),
            }),
            // Min point distance to cause clustering
            distance: clusterDist,
        });

        // Create the layer
        let places = new VectorLayer({
            source: clusterSource,
            style: getStyles,
        });

        // Basemap layer, via ESRI API
        let basemap = new TileLayer({
            source: new XYZ({
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                    'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            }),
        });

        /* Popup logic */

        let container = document.getElementById('popup');
        let content = document.getElementById('popup-content');
        let closer = document.getElementById('popup-closer');

        // Create an overlay to anchor the popup to the map.
        let overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        /**
         * Add a click handler to hide the popup.
         * @return {boolean} Don't follow the href.
         */
        closer.onclick = () => {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        // The map and view
        let map = new Map({
            // Div id to put map in
            target: props.mapId,
            layers: [basemap, places],
            overlays: [overlay],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 1,
            }),
        });


        // Add a click handler to the map to render the popup.
        map.on('singleclick', evt => {
            let pixel = evt.pixel;
            let coord = evt.coordinate;
            // Highly nested data! These are the places in an array
            let features = map.getFeaturesAtPixel(pixel);
            if (features.length === 0) {
                return;
            }
            let places = map.getFeaturesAtPixel(pixel)[0].getProperties().features;

            let html;
            if (places.length > 1) {        // This is a cluster
                html = `
                    <p>
                        There are ${places.length} places in this area.<br>
                        Zoom in to see details.
                    </p>
                `
            } else {                        // This is a single place
                let place = places[0].getProperties();
                console.log(place);
                html = `
                    <p>
                        Name: <strong>${place.name}</strong><br>
                        Place Type: ${place.typeName}<br>
                        Population: ${place.population}<br>
                        Carbon: ${place.carbon}
                    </p>
                `
            }
            content.innerHTML = html;
            overlay.setPosition(coord);
        });
    }, [props.mapId]);  // End useEffect. Empty list => Not re-run

    return (
        <div className="OlMap">
            {/* Map */}
            <div id={props.mapId}></div>
            {/* Popup holder */}
            <div id="popup" className="ol-popup">
                <button id="popup-closer" className="ol-popup-closer"></button>
                <div id="popup-content"></div>
            </div>
        </div>
    );
}

export default OlMap;