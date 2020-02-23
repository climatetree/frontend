import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import "../styles/Stories.css";

const Stories = props => {
  let useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let term = query.get("storyTitle");

  useEffect(() => {
    (async () => {
      setStories([]);
      let responses = await axios.get(
        `https://backend-mongo-stories.azurewebsites.net/stories/title/${term}`
      );
      setStories(
        responses.data.map(story => {
          return { ...story, date: new Date(story.date) };
        })
      );
    })();
  }, [term]);

  const [stories, setStories] = useState([]);

  return (
    <>
      <Nav />
      <div id="stories-background"></div>

      <section className="stories-container">
        {!stories.length && <h3 style={{ color: "#fff" }}>Loading...</h3>}

        {stories.length && (
          <>
            <StorySearchBar searchTerm={term} {...props} />
            <div>
              {stories.map(story => (
                <StoryDetail story={story} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Stories;
