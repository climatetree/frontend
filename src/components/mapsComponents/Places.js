import React from 'react';
import './Places.css';

function Places({places}) {
  return (
    <div className="places-container">
      <p>Total: {places.length}</p>
      {places.map((place) => (
        <div key={place.placeId}>
          <p>Name: {place.name}</p>
          <p>Type Name: {place.typeName}</p>
          <p>Population: {place.population}</p>
          <p>Carbon: {place.carbon}</p>
        </div>
      ))}
    </div>
  );
}

export default Places;