import React, { useState } from "react";

import { getPlacesByName } from "../services/fetchPlaces";

const Maps = () => {
  const [searchPlace, setSearchPlaceTerm] = useState("");
  const [places, setPlaces] = useState([]);

  const whenUserInputPlace = event => {
    setSearchPlaceTerm(event.target.value);
  };

  const onSearchPlaceClick = async () => {
    const response = await getPlacesByName(searchPlace);
    setPlaces(response);
    setSearchPlaceTerm("");
  };

  return (
    <div>
      <input
        type="text"
        style={{ color: "#000" }}
        placeholder="Enter a place"
        value={searchPlace}
        onChange={event => whenUserInputPlace(event)}
      />
      <button style={{ color: "#000" }} onClick={onSearchPlaceClick}>
        Search
      </button>
      <br></br>
      <span style={{ color: "#000" }}>{places.length}</span>
    </div>
  );
};

export default Maps;
