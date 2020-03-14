import React from "react";
import "./Places.css";

export default function Places({
  features,
  targetPlace,
}) {
  return (
    <div className="places-container">
      {features ? (
        <>
          <p>Target place:</p>
          <p className='target-place'>
            Name: {targetPlace.properties.name}
          </p>
          {/* <p className='target-place'>
            Type Name: {targetPlace.properties.type_name}
          </p> */}
          <p className='target-place'>
            Population: {targetPlace.properties.population}
          </p>
          <p className='target-place'>
            Carbon: {targetPlace.properties.carbon}
          </p>
          <br/>
          <p>Total similar places: {features.length}</p>
          {features.map(({ properties }, index) => (
            <div key={properties.place_id}>
              <p>{index + 1}</p>
              <p>Name: {properties.name}</p>
              <p>Type Name: {properties.type_name}</p>
              <p>Population: {properties.population}</p>
              <p>Carbon: {properties.carbon}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Place panel</p>
      )}
    </div>
  );
}
