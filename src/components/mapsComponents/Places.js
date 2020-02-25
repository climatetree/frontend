import React from 'react';
import './Places.css';

export default function Places({places}) {
  return (
    <div className="places-container">
      <p>Total: {places.length}</p>
      {places.map((place, index) => (
        <div key={place.placeId}>
          <p>{index + 1}</p>
          <p>Name: {place.name}</p>
          <p>Type Name: {place.typeName}</p>
          <p>Population: {place.population}</p>
          <p>Carbon: {place.carbon}</p>
        </div>
      ))}
    </div>
  );
};