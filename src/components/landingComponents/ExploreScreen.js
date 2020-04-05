/**
 * The function ExporeScreen() is displaying the HTML that highlights the most popular stories of the application
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactTinyLink } from "react-tiny-link";

import "./ExploreScreen.css";

function ExploreScreen() {
  const [popularStories, setPopularStories] = useState([]);
  let newPopularStoriesWithLinkPreview = [];

  useEffect(() => {
    (async () => {
      const numberOfStories = 3;
      const response = await axios.get(
        `https://backend-mongo-stories.azurewebsites.net/stories/topStories/${numberOfStories}`
      );

      for (let i = 0; i < numberOfStories; i++) {
        const encodedUrl = encodeURIComponent(response.data[i]["hyperlink"]);
        const resp = await axios.get(
          `https://backend-mongo-stories.azurewebsites.net/stories/getPreview?hyperlink=${encodedUrl}`
        );

        newPopularStoriesWithLinkPreview[i] = resp.data;
        newPopularStoriesWithLinkPreview[i]["hyperlink"] =
          response.data[i]["hyperlink"];
      }

      setPopularStories(newPopularStoriesWithLinkPreview);

      if (window.scrollY > (window.innerHeight * 4) / 5) {
        document.getElementById("explore-header").classList.add("fade-in");
        const exploreTiles = [...document.querySelectorAll(".explore-tile")];
        for (let i = 0; i < exploreTiles.length; i++) {
          setTimeout(() => {
            exploreTiles[i].classList.add("fade-in", "move-up");
          }, 200 * (i + 1));
        }
      }
    })();
  }, []);

  return (
    <>
      <section id="explore-screen">
        <h2 id="explore-header">Explore Top Popular Stories</h2>
        {!popularStories.length && (
          <div className="spinner-explore-container">
            <div className="spinner-explore"></div>
          </div>
        )}
        {popularStories.map(ps => (
          <a href={ps.hyperlink} className="explore-tile">
            <img src={ps.image} alt={ps.title} />
            <p className="popular-stories-title">
              <a
                href={ps.hyperlink}
                className="popular-stories-title ps-title-link"
              >
                {ps.title}
              </a>
            </p>
            {ps.description && (
              <p className="ps-description">{ps.description}</p>
            )}
          </a>
        ))}
      </section>
    </>
  );
}

export default ExploreScreen;
