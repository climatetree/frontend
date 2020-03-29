import React, { Component } from "react";

import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import Cluster from "ol/source/Cluster";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";

import { styleFunction as getStyles } from "./helpers/olStyles";
import { getGeoJson, getGeoServerData } from "./helpers/data";
import popUpHandler from "./helpers/popupHandler";
import { createPopupOverlay } from "./helpers/popups";
import Filters from './Filters';

class OlMap extends Component {
  state = { map: null };

  componentDidMount() {
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

    // Create the layer
    let places = new VectorLayer({
      source: clusterSource,
      style: getStyles
    });

    // Basemap layer, via ESRI API
    let basemap = new TileLayer({
      source: new XYZ({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/Canvas/World_Dark_Gray_Base/MapServer">ArcGIS</a>',
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/" +
          "World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      })
    });

    // An overlay for the map that allows popups on points
    let overlay = createPopupOverlay();

    // The map and view
    let map = new Map({
      // Div id to put map in
      target: this.props.mapId,
      layers: [basemap, places],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 1
      })
    });

    // Open popups when a point is clicked on
    map.on("singleclick", evt =>
      popUpHandler(evt, map, overlay, this.props.history, this.props.targetPlace)
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
      overlay: overlay
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.places !== prevProps.places) {
      // Close any open popups
      this.state.overlay.setPosition(undefined);

      // Swap out data points with new search results
      let collection = this.state.map.getLayers();
      let dataSource = collection
        .getArray()[1]
        .getSource()
        .getSource();
      dataSource.clear({ fast: true });
      dataSource.addFeatures(this.props.places);
    }
  }

  render() {
    return (
      <div className="OlMap">
        {/* Map */}
        <div id="map"></div>
        {/* <Filters
          getSimilarPlaces={getSimilarPlaces}
          targetPlaceID={targetPlace ? targetPlace.properties.place_id : null}
          setTargetPlace={setTargetPlace}
        /> */}
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
