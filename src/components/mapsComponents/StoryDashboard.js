import React, { useState, useEffect } from 'react';
import { percentiStringify, goToStories } from '../mapsComponents/helpers/popupHandler';
import MapStoryPreview from './MapStoryPreview';
import { generateStoryImage } from '../loginComponents/helper';
import UpIcon from '../../images/chevron-up.svg';
import DownIcon from '../../images/chevron-down.svg';
import './StoryDashboard.css';

export default function StoryDashboard({
  targetPlaceProps,
  comparePlaceProps,
  history,
}) {
  const [stories, setStories] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
  useEffect(() => {
    if (comparePlaceProps) {
      (async () => {
        const response = await fetch(`https://climatetree-api-gateway.azurewebsites.net/stories/place/${comparePlaceProps.place_id}`);
        const placeStories = await response.json();
        const results = [];
        const storyImageGenerator = generateStoryImage(placeStories);
        for await (const updatedStory of storyImageGenerator) {
          results.push(updatedStory);
        }
        setStories(results);
      })();
    } else {
      setStories([]);
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
          {stories.length > 0 && (
            <>
              {isMobileOpen ? (
                <button
                  className="map-toggle-btn"
                  onClick={() => {
                    const storyDashboard = document.querySelector('.story-dashboard');
                    storyDashboard.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                    storyDashboard.classList.toggle('open');
                    setIsMobileOpen(false);
                  }}
                >
                  Hide Top Stories
                  <img src={DownIcon} alt="Top Stories" />
                </button>
              ) : (
                <button
                  className="map-toggle-btn"
                  onClick={() => {
                    document.querySelector('.story-dashboard').classList.toggle('open');
                    setIsMobileOpen(true);
                  }}
                >
                  View Top Stories
                  <img src={UpIcon} alt="Top Stories" />
                </button>
              )}
            </>
          )}
        </div>
      )}
      {stories.map(story => (
        <MapStoryPreview key={story.story_id} story={story} />
      ))}
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