import React from "react";
import "../../styles/IntroScreen.css";

function IntroScreen() {
  return (
    <section id="intro-screen">
      <h2 id="intro-header">The best search service for climate actions</h2>
      <div className="intro">
        <h3>Search</h3>
        <p>
          Search for stories of climate action from around the world. Explore
          stories directly by category or visit our Map page to find stories
          from places similar to where you live.
        </p>
      </div>
      <div className="intro">
        <h3>Share</h3>
        <p>
          Know of exciting climate actions happening around you? Share them with
          the world here!
        </p>
      </div>
      <div className="intro">
        <h3>Usable</h3>
        <p>
          Think your local government won't commit to climate change mitigation?
          Help convince those in charge to take action by finding strategies
          that worked for places similar to your community.
        </p>
      </div>
    </section>
  );
}

export default IntroScreen;
