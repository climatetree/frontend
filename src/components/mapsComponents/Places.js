import React from 'react';
import './Places.css';

function Places({places}) {
  return (
    <div className="places-container">
      <p>{places.length}</p>
      {places.map((place) => (
        <p key={place.placeId}>{JSON.stringify(place)}</p>
      ))}
    </div>
  );
}

export default Places;