import React, { useEffect } from 'react';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Cluster from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

import { styleFunction as getStyles } from './helpers/olStyles';
import { getGeoJson, getData, getData2 } from './helpers/data';
import { popUpHandler } from './helpers/eventHandlers';
import { createPopupOverlay } from './helpers/popups';

const OlMap = (props) => {
    // OpenLayers code to render the map
    useEffect(() => {
        /* Mapping Logic*/

        // Enable clustering for points
        const clusterDist = 20;
        let clusterSource = new Cluster({
            // Data
            source: new VectorSource({
                // Extract features from GeoJSON data
                features: getGeoJson(getData()),
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

        // An overlay for the map that allows popups on points
        let overlay = createPopupOverlay();

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
        map.on('singleclick', evt => popUpHandler(evt, map, overlay));

        let searchBar = document.getElementById("search");
        searchBar.addEventListener('submit', evt => {
            evt.preventDefault();
            let collection = map.getLayers();
            let dataSource = collection.getArray()[1].getSource().getSource();
            dataSource.clear({ fast: true });
            dataSource.addFeatures(getGeoJson(getData2()));
        });

    }, [props] );  // End useEffect. Empty list => Not re-run

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