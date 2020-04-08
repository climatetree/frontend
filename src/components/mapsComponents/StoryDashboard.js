import React from 'react';
import { percentiStringify } from '../mapsComponents/helpers/popupHandler';
import './StoryDashboard.css';

export default function StoryDashboard({
  targetPlaceProps,
  comparePlaceProps,
}) {
  return (
    <section className="story-dashboard">
      {targetPlaceProps && (
        <div className="card">
          <p className="title target-title">
            {targetPlaceProps.name}
          </p>
          <p className="item-name">Population</p>
          <p>{Math.round(targetPlaceProps.population)}</p>
          <p className="item-name">Population Density - <small>pop/km</small></p>
          <p>{Math.round(targetPlaceProps.popdensity)}</p>
          <p className="item-name">
            Carbon - <small>kg/year</small>
          </p>
          <p>{targetPlaceProps.carbon}</p>
          <p className="item-name">
            Carbon Per Capita - <small>carbon/person</small>
          </p>
          <p>{targetPlaceProps.percapcarb}</p>
        </div>
      )}
      {comparePlaceProps && (
        <div className="card">
          <p className="title">
            {comparePlaceProps.name} - <small>{comparePlaceProps.type_name}</small>
          </p>
          <p className="item-name">
            Population
          </p>
          <p className={`${getSign(targetPlaceProps.population, comparePlaceProps.population)}`}>
            {percentiStringify(targetPlaceProps.population, comparePlaceProps.population)}
          </p>
          <p className="item-name">
            Population Density - <small>pop/km</small>
          </p>
          <p className={`${getSign(targetPlaceProps.popdensity, comparePlaceProps.popdensity)}`}>
            {percentiStringify(targetPlaceProps.popdensity, comparePlaceProps.popdensity)}
          </p>
          <p className="item-name">
            Carbon - <small>kg/year</small>
          </p>
          <p className={`${getSign(targetPlaceProps.carbon, comparePlaceProps.carbon)}`}>
            {percentiStringify(targetPlaceProps.carbon, comparePlaceProps.carbon)}
          </p>
          <p className="item-name">
            Carbon Per Capita - <small>carbon/person</small>
          </p>
          <p className={`${getSign(targetPlaceProps.percapcarb, comparePlaceProps.percapcarb)}`}>
            {percentiStringify(targetPlaceProps.percapcarb, comparePlaceProps.percapcarb)}
          </p>
        </div>
      )}
    </section>
  );
}

function getSign(targetPlaceNum, currentPlaceNum) {
  if (targetPlaceNum <= currentPlaceNum) {
    return 'positive';
  } else {
    return 'negative';
  }
}