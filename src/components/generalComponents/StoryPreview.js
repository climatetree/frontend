import React from "react";
import "./StoryPreview.Profile.css";
import "./StoryPreview.Map.css";

export default function StoryPreview({ story, cssScope }) {
  return (
    <a
      className={`${cssScope}-story-wrapper`}
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
