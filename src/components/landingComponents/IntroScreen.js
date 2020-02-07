import React from "react";
import "../../styles/IntroScreen.css";

function IntroScreen() {
  return (
    <section id="intro-screen">
      <h2 id="intro-header">The best search service for climate actions</h2>
      <div className="intro">
        <h3>Search</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          alias cupiditate nobis. Blanditiis, nihil! Ea, porro accusantium!
        </p>
      </div>
      <div className="intro">
        <h3>Share</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          alias cupiditate nobis. Blanditiis, nihil!
        </p>
      </div>
      <div className="intro">
        <h3>Usable</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          corrupti esse, ducimus, nihil voluptatum voluptates ad et iusto
          reiciendis minus, facere maxime dolor neque.
        </p>
      </div>
    </section>
  );
}

export default IntroScreen;
