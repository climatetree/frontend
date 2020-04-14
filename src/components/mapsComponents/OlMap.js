import React, { Component } from "react";

import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import BaseLayer from 'ol/layer/Base';
import Cluster from "ol/source/Cluster";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

import { primaryStyle, targetStyle } from "./helpers/olStyles";
import { getGeoJson } from "./helpers/data";
import { popUpHandler } from "./helpers/popupHandler";
import { createPopupOverlay } from "./helpers/popups";

class OlMap extends Component {
  state = { map: null };
  setUpMap() {

  }
  componentDidMount() {
    this.setUpMap();
    // Enable clustering for points
    const clusterDist = 20;
    let clusterSource = new Cluster({
      // Data
      source: new VectorSource({
        // Extract features from GeoJSON data
        features: getGeoJson(
          // GeoJSON starter object
          {
            type: "FeatureCollection",
            features: []
          }
        )
      }),
      // Min point distance to cause clustering
      distance: clusterDist
    });

    // Create the primary layer for places
    let placesLayer = new VectorLayer({
      source: clusterSource,
      style: primaryStyle,
    });

    // Create a layer to display just the searched for place
    // Helps users easily reference their original searched place
    let targetPlaceLayer = new VectorLayer({
      source: new VectorSource({
        // Extract features from GeoJSON data
        features: getGeoJson(
          // GeoJSON starter object
          {
            type: "FeatureCollection",
            features: []
          }
        )
      }),
      style: targetStyle,
    });

    let baseMapDark = new TileLayer({
      source: new XYZ({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/Canvas/World_Dark_Gray_Base/MapServer">ArcGIS</a>',
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/" +
          "World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      })
    })

    let baseMapGeo = new TileLayer({
      source: new XYZ({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/NatGeo_World_Map/MapServer">ArcGIS</a>',
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
      })
    });
    
    // An overlay for the map that allows popups on points
    let overlay = createPopupOverlay();

    // The map and view
    let map = new Map({
      // Div id to put map in
      target: this.props.mapId,
      layers: [baseMapDark, baseMapGeo, placesLayer, targetPlaceLayer],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 1
      })
    });
    baseMapGeo.setVisible(false);
    // Open popups when a point is clicked on
    map.on("singleclick", evt =>
      popUpHandler(evt, map, overlay, this.props.history, this.props.setComparePlaceProps)
    );

    // Close popups when features change
    let currZoom = map.getView().getZoom();
    map.on("moveend", () => {
      let newZoom = map.getView().getZoom();
      if (currZoom != newZoom) {
        overlay.setPosition(undefined);
        currZoom = newZoom;
      }
    });

    this.setState({
      map: map,
      overlay: overlay,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.places !== prevProps.places) {
      // Close any open popups
      this.state.overlay.setPosition(undefined);

      // Swap out places data points with new search results
      let collection = this.state.map.getLayers();
      let placesSource = collection
        .getArray()[2]  // placesLayer
        .getSource()    // cluster source
        .getSource();   // vector source
      placesSource.clear({ fast: true });
      placesSource.addFeatures(this.props.places);

      // Swap out target place data point
      let targetSource = collection
        .getArray()[3]  // targetPlaceLayer
        .getSource();   // vector source (no cluster for this layer)
      targetSource.clear({ fast: true });
      targetSource.addFeatures(getGeoJson(
        {
          type: "FeatureCollection",
          features: [this.props.targetPlace]
        }
      ));

      // Find target place to highlight on map
      // Get the target place search ID
      let targetId = this.props.targetPlace.properties.place_id;
      this.props.places.forEach(feature => {
        // Look for the feature that represents the searched place
        if (feature.values_.place_id === targetId) {
          let targetCoordinates = feature.values_.geometry.flatCoordinates;
          let view = this.state.map.getView();

          // Center map on searched for place and zoom in
          view.setCenter(targetCoordinates);
          view.setZoom(4.5);
        }
      });
    }
    if (this.props.baseMap != prevProps.baseMap) {
      this.state.map.getLayers().forEach((ele, index, arr) => {
        if (this.props.baseMap == 'natGeo' && index == 0) {
          ele.setVisible(false);
        } else if (this.props.baseMap == 'natGeo' && index == 1) {
          ele.setVisible(true)
        }
        if (this.props.baseMap == 'dark' && index == 0) {
          ele.setVisible(true);
        } else if (this.props.baseMap == 'dark' && index == 1) {
          ele.setVisible(false);
        }
      });
  }
  }

  render() {
    return (
      <div className="OlMap">
        {/* Map */}
        <div id="map"></div>
        {/* Popup holder */}
        <div id="popup" className="ol-popup">
          <button id="popup-closer" className="ol-popup-closer"></button>
          <div id="popup-content"></div>
        </div>
      </div>
    );
  }
}

export default OlMap;
