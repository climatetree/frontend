import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import ResultsFor from "./storiesComponents/ResultsFor";
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
      setLoading(true);

      let responses = await axios.get(
        `https://backend-mongo-stories.azurewebsites.net/stories/title/${term}`
      );
      let temp = responses.data.map(story => {
        return { ...story, date: new Date(story.date) };
      });
      setStories(temp);

      setLoading(false);
    })();
  }, [term]);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(stories);

  return (
    <>
      <Nav />
      <div
        className={`stories-background ${!stories.length ? "darker" : ""}`}
      ></div>

      <section className="stories-container">
        <StorySearchBar searchTerm={term} {...props} loading={loading} />
        <div>
          {
            <>
              {!stories.length && (
                <div className="spinner-container">
                  <div className="spinner"></div>
                </div>
              )}
              {stories.length && (
                <>
                  <ResultsFor searchTerm={term} />
                  {stories.map(story => (
                    <StoryDetail story={story} />
                  ))}
                </>
              )}
            </>
          }
        </div>
      </section>
    </>
  );
};

export default Stories;
