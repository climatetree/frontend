import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const [stories, setStories] = useState([]);
  const [generalSearchTerm, setGeneralSearchTerm] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [removedStory, setRemovedStory] = useState('')

  // Retrieve query name from URL with React Router
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let placeId = query.get("place_id");
  let placeName = query.get("place_name");

  const BASED_URL_FOR_STORY_TITLE = `https://climatetree-api-gateway.azurewebsites.net/stories/title/${query.get(
    "storyTitle"
  )}`;

  const BASED_URL_FOR_PLACE_ID = `https://climatetree-api-gateway.azurewebsites.net/stories/place/${placeId}`;

  // State lifecycle
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (windowWidth > 950) {
      setSideBarVisible(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (query.get("storyTitle") || query.get("place_id")) {
      (async () => {
        setStories([]);
        setLoadSpinner(true);

        const response = await axios.get(
          query.get("storyTitle")
            ? BASED_URL_FOR_STORY_TITLE
            : BASED_URL_FOR_PLACE_ID
        );

        setStories(
          response.data.map((story) => {
            return { ...story, date: new Date(story.date) };
          })
        );

        setGeneralSearchTerm(
          query.get("storyTitle") || query.get("place_name")
        );
        setLoadSpinner(false);
      })();
    } else {
      (async () => {
        await fetchRecentStories();
      })();
    }
  }, [removedStory]);

  useEffect(() => {
    let { history } = props;
    setStories([]);

    setGeneralSearchTerm(query.get("storyTitle") || placeName || "");
    if (generalSearchTerm) {
      if (history.location.state) {
        setStories(
          history.location.state.storiesResult.map((story) => {
            return { ...story, date: new Date(story.date) };
          })
        );
      } else {
        (async () => {
          await fetchRecentStories();
        })();
      }
    }
  }, [query.get("storyTitle"), removedStory]);

  const fetchRecentStories = async () => {
    setLoadSpinner(true);
    const response = await axios.get(
      "https://climatetree-api-gateway.azurewebsites.net/stories/topStories/5"
    );

    setStories(
      response.data.map((story) => {
        return { ...story, date: new Date(story.date) };
      })
    );
    setLoadSpinner(false);
  };

  const searchForStoriesBasedOnSearchTerm = async (searchTerm, history) => {
    if (searchTerm) {
      setLoadSpinner(true);
      setGeneralSearchTerm(searchTerm);

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

  /**
   * Removes a story from the database.
   */
  const deleteStoryHandler = async (story_id, jwt) => {
    await fetch(
      `https://climatetree-api-gateway.azurewebsites.net/stories/delete/${story_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setRemovedStory(story_id);
  }

  const openSideBar = () => {
    setSideBarVisible(true);
  };

  const closeSideBar = () => {
    setSideBarVisible(false);
  };

  const setStoriesBasedOnFilter = (filteredStories) => {
    let { history } = props;

    setStories(
      filteredStories.map((story) => {
        return { ...story, date: new Date(story.date) };
      })
    );

    history.push({
      pathname: "/stories",
      state: {
        storiesResult: filteredStories.map((story) => {
          return { ...story, date: new Date(story.date) };
        }),
      },
    });
  };

  // Conditional rendering based on place id and search term
  const renderResultFor = () => {
    return (
      <div className="result-for-and-filter">
        {placeId ? (
          <ResultForPlaceId placeId={placeId} placeName={placeName} />
        ) : generalSearchTerm ? (
          <ResultsFor searchTerm={query.get("storyTitle")} />
        ) : (
              <h2 id="recent-stories">Recent Stories</h2>
            )}
        <div className="click-filter" onClick={openSideBar}>
          Filters
        </div>
      </div>
    );
  };

  // Conditional rendering
  const renderContent = () => {
    return (
      <>
        {/* {renderResultFor()} */}
        {stories.length &&
          stories.map((story, index) => (
            <StoryDetail
              story={story}
              key={story.story_id}
              deleteStoryHandler={deleteStoryHandler}
              index={index}
              stories={stories}
              setStories={setStories}
            />
          ))}
        {!stories.length && !loadSpinner && (
          <div className="no-found-msg">
            No stories were found.
            {generalSearchTerm.length && (
              <a
                href={`https://www.google.com/search?q=${generalSearchTerm}`}
                target="_blank"
                rel="noopener noreferrer"
                id="direct-to-google-search"
              >
                Would you like to help look for one?
              </a>
            )}
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
      {windowWidth < 951 && (
        <SideBar
          sideBarVisible={sideBarVisible}
          windowWidth={windowWidth}
          closeSideBar={closeSideBar}
          setStoriesBasedOnFilter={setStoriesBasedOnFilter}
        />
      )}

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
        {windowWidth > 950 && (
          <SideBar
            sideBarVisible={sideBarVisible}
            windowWidth={windowWidth}
            closeSideBar={closeSideBar}
            setStoriesBasedOnFilter={setStoriesBasedOnFilter}
          />
        )}
      </div>
    </div>
  );
};

export default Stories;
