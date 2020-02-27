import React from "react";
import "./Places.css";

export default function Places({ features }) {
  console.log("PLACES", features);
  return (
    <div className="places-container">
      <p>Total: {!features ? 0 : features.length}</p>
      {!features
        ? ""
        : features.map(({ properties }, index) => (
            <div key={properties.place_id}>
              <p>{index + 1}</p>
              <p>Name: {properties.name}</p>
              <p>Type Name: {properties.typeName}</p>
              <p>Population: {properties.population}</p>
              <p>Carbon: {properties.carbon}</p>
            </div>
          ))}
    </div>
  );
}
