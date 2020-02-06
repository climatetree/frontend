import React, { useEffect } from 'react';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';

import getStyles from './helpers/olStyles';
import {getData, jsonToGeoJson} from './helpers/data';

const OlMap = (props) => {
    // OpenLayers code to render the map
    useEffect(() => {

        /* Mapping */

        // Enable clustering for points
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
            distance: 20,
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

        // The map and view
        new Map({
            // Div id to put map in
            target: 'map',
            layers: [basemap, places],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 1,
            }),
        });
    }, []);  // End useEffect. Empty list => Not re-run

    return (
        <div className="OlMap"
             id="map"
             style={{
                    width: '100vw',
                    height: '100vh',
                }}>
        </div>
    );
}

export default OlMap;