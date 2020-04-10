import React, { useEffect } from 'react';
import { percentiStringify, goToStories } from '../mapsComponents/helpers/popupHandler';
import './StoryDashboard.css';

export default function StoryDashboard({
  targetPlaceProps,
  comparePlaceProps,
  history,
}) {
  useEffect(() => {
    const targetCard = document.querySelector('.card.target');
    if (targetCard) {
      if (comparePlaceProps) {
        if (targetPlaceProps.place_id === comparePlaceProps.place_id) {
          targetCard.classList.remove('mobile-hide');
          document.querySelector('.card.comparison').classList.add('mobile-hide');
        } else {
          targetCard.classList.add('mobile-hide');
          document.querySelector('.card.comparison').classList.remove('mobile-hide');
        }
      } else {
        targetCard.classList.remove('mobile-hide');
      }
    }
  }, [comparePlaceProps]);
  return (
    <section className="story-dashboard">
      {targetPlaceProps && (
        <div className="card target">
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
          <button id="popup-btn" onClick={() => goToStories(targetPlaceProps, history)}>
            View Stories
          </button>
        </div>
      )}
      {comparePlaceProps && (
        <div className="card comparison">
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
          <button id="popup-btn" onClick={() => goToStories(comparePlaceProps, history)}>
            View Stories
          </button>
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