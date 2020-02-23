import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import Spinner from "./storiesComponents/Spinner";
import ResultsFor from "./storiesComponents/ResultsFor";
import "../styles/Stories.css";

const Stories = props => {
  // Initialize state
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieve query name from URL with React Router
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let term = query.get("storyTitle");

  // State lifecycle
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

  // Conditional rendering
  const renderContent = () => {
    if (!stories.length) {
      return <Spinner />;
    }

    return (
      <>
        <ResultsFor searchTerm={term} />
        {stories.map(story => (
          <StoryDetail story={story} />
        ))}
      </>
    );
  };

  return (
    <>
      <Nav />
      {/* Background image */}
      <div
        className={`stories-background ${!stories.length ? "darker" : ""}`}
      ></div>

      <section className="stories-container">
        <StorySearchBar searchTerm={term} {...props} loading={loading} />
        <div>{renderContent()}</div>
      </section>
    </>
  );
};

export default Stories;
