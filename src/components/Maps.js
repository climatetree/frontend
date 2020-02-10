import React, { Component } from "react";
import axios from "axios";

import OlMap from "./mapsComponents/OlMap";
import Search from "./mapsComponents/Search";

import "../styles/Maps.css";

class Maps extends Component {
  state = { term: "", places: [] };

  whenUserClickSearch = search => {
    this.setState({
      term: search
    });

    return axios
      .get(`https://places-postgres.azurewebsites.net/api/names/${search}`)
      .then(resp => this.setState({ places: resp.data }));
  };

  render() {
    return (
      <div id="MapsPage">
        <Search onClick={this.whenUserClickSearch} places={this.state.places} />
        <OlMap mapId="map" places={this.state.places} term={this.state.term} />
      </div>
    );
  }
}

export default Maps;
