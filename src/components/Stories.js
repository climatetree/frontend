import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import Spinner from "./storiesComponents/Spinner";
import ResultsFor from "./storiesComponents/ResultsFor";
import ResultForPlaceId from "./storiesComponents/ResultForPlaceId";
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
  let generalSearchTerm = query.get("storyTitle");
  let placeId = query.get("place_id");

  // State lifecycle
  useEffect(() => {
    (async () => {
      setStories([]);

      if (generalSearchTerm || placeId) {
        setLoading(true);

        const BASE_URL = generalSearchTerm
          ? "http://localhost:3000/stories/title/"
          : "http://localhost:3000/stories/place/";
        const PARAMETER = generalSearchTerm || placeId;

        let responses = await axios.get(`${BASE_URL}${PARAMETER}`);
        let temp = responses.data.map(story => {
          return { ...story, date: new Date(story.date) };
        });

        setStories(temp);
        setLoading(false);
      }
    })();
  }, [generalSearchTerm]);

  // Conditional rendering based on place id and search term
  const renderResultFor = () => {
    console.log(placeId);
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
    if (loading) {
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
      <div className={`stories-background ${loading ? "darker" : ""}`}></div>

      <section className="stories-container">
        <StorySearchBar
          termForSearchBar={generalSearchTerm}
          {...props}
          loading={loading}
        />
        {loading !== null && <div>{renderContent()}</div>}
      </section>
    </>
  );
};

export default Stories;
