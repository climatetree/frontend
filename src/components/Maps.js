import React, { useState, useEffect } from "react";

import { getPlacesByName } from "../services/fetchPlaces";

const Maps = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getPlacesByName();
      setPlaces(response);
    })();
  }, []);

  return (
    <ul>
      <h1 style={{ color: "black" }}>Maps</h1>
      {places.map(p => (
        <li style={{ color: "black" }}>{p.name}</li>
      ))}
    </ul>
  );
};

export default Maps;
