import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import Spinner from "./storiesComponents/Spinner";
import ResultsFor from "./storiesComponents/ResultsFor";
import ResultForPlaceId from "./storiesComponents/ResultForPlaceId";
import "./Stories.css";

const Stories = props => {
  // Initialize state
  const [stories, setStories] = useState([]);
  const [loadSpinner, setLoadSpinner] = useState(false);

  // Retrieve query name from URL with React Router
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let generalSearchTerm = query.get("storyTitle") || "";
  let placeId = query.get("place_id");

  // State lifecycle
  useEffect(() => {
    (async () => {
      setStories([]);

      if (generalSearchTerm || placeId) {
        setLoadSpinner(true);

        const BASE_URL = generalSearchTerm
          ? "https://climatetree-api-gateway.azurewebsites.net/stories/title/"
          : "https://climatetree-api-gateway.azurewebsites.net/stories/place/";
        const PARAMETER = generalSearchTerm || placeId;

        let responses = await axios.get(`${BASE_URL}${PARAMETER}`);
        let temp = responses.data.map(story => {
          return { ...story, date: new Date(story.date) };
        });

        setStories(temp);
        setLoadSpinner(false);
      }
    })();
  }, [generalSearchTerm]);

  // Conditional rendering based on place id and search term
  const renderResultFor = () => {
    return placeId ? (
      <ResultForPlaceId
        placeId={placeId}
        placeName={props.location.state.placeName}
      />
    ) : (
        <ResultsFor searchTerm={generalSearchTerm} />
      );
  };

  // Conditional rendering
  const renderContent = () => {
    if (loadSpinner) {
      return <Spinner />;
    }

    return (
      <>
        {renderResultFor()}
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
      <div className={`stories-background`}></div>

      <section className="stories-container">
        <StorySearchBar
          termForSearchBar={generalSearchTerm}
          {...props}
          loadSpinner={loadSpinner}
        />
        {loadSpinner !== null && renderContent()}
      </section>
    </>
  );
};

export default Stories;
