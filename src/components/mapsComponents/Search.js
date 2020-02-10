import React, { Component } from "react";

class Search extends Component {
  state = { searchTerm: "" };

  whenUserInputPlace = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onSearchClick = event => {
    event.preventDefault();
    this.props.onClick(this.state.searchTerm);

    this.setState({
      searchTerm: ""
    });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div id="search">
        <input
          type="text"
          style={{ color: "#000" }}
          placeholder="Enter a place"
          value={searchTerm}
          onChange={event => this.whenUserInputPlace(event)}
        />
        <button
          style={{ color: "#000" }}
          onClick={event => this.onSearchClick(event)}
        >
          Search
        </button>
        <br></br>
        <span style={{ color: "#000" }}>{this.props.places.length}</span>
      </div>
    );
  }
}

export default Search;
