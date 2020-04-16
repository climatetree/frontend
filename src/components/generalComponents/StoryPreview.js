import React, { useEffect } from "react";
import './StoryPreview.css';

export default function StoryPreview({ story, cssScope }) {
  useEffect(() => {
    if (cssScope) {
      (async () => {
        require(`./StoryPreview.${cssScope}.css`);
      })();
    }
  }, []);
  return (
    <a
      className={`story-wrapper ${cssScope}-story-wrapper`}
      href={story.hyperlink}
      target="_blank"
    >
      <div className="story-image">
        <img src={story.image} alt={story.story_title} />
        <div className="story-rating" title="ClimateTree quality rating">
          {story.rating === 0 ? (
            <p>Unrated</p>
          ) : (
            <p>Rating: {story.rating}</p>
          )}
        </div>
      </div>
      <div className="story-detail">
        <header>
          {story.sector && (
            <>
              {story.sector.map((s, i) => (
                <span key={i} title="sector">{s}</span>
              ))}
            </>
          )}
          {story.media_type && (
            <span title="media type">{story.media_type}</span>
          )}
        </header>
        <article>
          <p className="story-title">{story.story_title}</p>
          <p className="story-description">{story.description}</p>
          <p className="story-hyperlink">{story.hyperlink}</p>
        </article>
        <footer>
          <p className="story-post-info">Posted by {story.posted_by} - {new Date(story.date).toDateString()}</p>
        </footer>
      </div>
    </a>
  );
}