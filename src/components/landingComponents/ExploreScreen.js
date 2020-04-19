/**
 * The function ExporeScreen() is displaying the HTML that highlights the most popular stories of the application
 */
import React, { useEffect, useState } from "react";
import StoryPreview from '../generalComponents/StoryPreview';
import "./ExploreScreen.css";

export default function ExploreScreen() {
  const [popularStories, setPopularStories] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('https://climatetree-api-gateway.azurewebsites.net/stories/topStories/3');
      const topStories = await res.json();
      setPopularStories(topStories);
    })();
  }, []);
  return (
    <section id="explore-screen">
      <h2 id="explore-header">Explore Top Popular Stories</h2>
      {!popularStories.length && (
        <div className="spinner-explore-container">
          <div className="spinner-explore"></div>
        </div>
      )}
      {popularStories.map(story => (
        <StoryPreview
          key={story.story_id}
          story={story}
          cssScope="landing"
        />
      ))}
    </section>
  );
}