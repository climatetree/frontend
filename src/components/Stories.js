import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import Spinner from "./storiesComponents/Spinner";
import ResultsFor from "./storiesComponents/ResultsFor";
import ResultForPlaceId from "./storiesComponents/ResultForPlaceId";
import SideBar from "./storiesComponents/sidebarComponents/SideBar";

import "./Stories.css";

const Stories = (props) => {
  // Initialize state
  const [stories, setStories] = useState(
    props.history.location.state.storiesResult.map((story) => {
      return { ...story, date: new Date(story.date) };
    })
  );
  const [generalSearchTerm, setGeneralSearchTerm] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(false);

  // Retrieve query name from URL with React Router
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let placeId = query.get("place_id");
  let placeName = query.get("place_name");

  let history = useHistory();

  // State lifecycle
  useEffect(() => {
    (() => {
      let { history } = props;
      setStories([]);
      setGeneralSearchTerm(query.get("storyTitle") || placeName);

      setStories(
        history.location.state.storiesResult.map((story) => {
          return { ...story, date: new Date(story.date) };
        })
      );
    })();
  }, [query.get("storyTitle")]);

  useEffect(() => {
    (async () => {
      setStories([]);
      setLoadSpinner(true);

      const response = await axios.get(
        `https://climatetree-api-gateway.azurewebsites.net/stories/title/${
          query.get("storyTitle") || placeId
        }`
      );

      setStories(
        response.data.map((story) => {
          return { ...story, date: new Date(story.date) };
        })
      );

      setGeneralSearchTerm(query.get("storyTitle") || placeName);
      setLoadSpinner(false);
    })();
  }, []);

  const searchForStoriesBasedOnSearchTerm = async (searchTerm, history) => {
    if (searchTerm) {
      setLoadSpinner(true);

      const response = await axios.get(
        `https://climatetree-api-gateway.azurewebsites.net/stories/title/${searchTerm}`
      );

      setStories(
        response.data.map((story) => {
          return { ...story, date: new Date(story.date) };
        })
      );

      history.push({
        pathname: "/stories",
        search: `?storyTitle=${searchTerm}`,
        state: { storiesResult: response.data },
      });
      setLoadSpinner(false);
    }
  };

  // Conditional rendering based on place id and search term
  const renderResultFor = () => {
    return placeId ? (
      <ResultForPlaceId placeId={placeId} placeName={placeName} />
    ) : (
      <ResultsFor searchTerm={query.get("storyTitle")} />
    );
  };

  // Conditional rendering
  const renderContent = () => {
    return (
      <>
        {/* {renderResultFor()} */}
        {stories.length &&
          stories.map((story) => (
            <StoryDetail
              story={story}
              key={story.story_id}
              generalSearchTerm={generalSearchTerm}
            />
          ))}
        {!stories.length && !loadSpinner && (
          <div className="no-found-msg">
            No stories were found.
            <a
              href={`https://www.google.com/search?q=${generalSearchTerm}`}
              target="_blank"
              rel="noopener noreferrer"
              id="direct-to-google-search"
            >
              Would you like to help look for one?
            </a>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`${loadSpinner ? "unscrollable " : ""}stories-sontainer`}>
      <Nav />
      <div className={`stories-background`}></div>

      {loadSpinner && <Spinner />}

      <div className={`stories-grid`}>
        <div className={`${loadSpinner ? "hide" : ""} main-stories`}>
          <StorySearchBar
            termForSearchBar={generalSearchTerm}
            {...props}
            loadSpinner={loadSpinner}
            searchForStoriesBasedOnSearchTerm={
              searchForStoriesBasedOnSearchTerm
            }
          />
          {renderResultFor()}
          {!loadSpinner && renderContent()}
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default Stories;
