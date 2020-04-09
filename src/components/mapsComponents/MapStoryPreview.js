import React from 'react';
import './MapStoryPreview.css';

export default function MapStoryPreview({ story }) {
  return (
    <a
      className="map-story-wrapper"
      href={story.hyperlink}
      target="_blank"
    >
      <div className="story-image">
        <img src={story.image} alt={story.story_title} />
      </div>
      <div className="story-detail">
        <p className="story-title">{story.story_title}</p>
        <p>{story.description}</p>
        <p className="story-hyperlink">{story.hyperlink}</p>
      </div>
    </a>
  );
}