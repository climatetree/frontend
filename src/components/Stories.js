import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Nav from "./Nav";
import StoryDetail from "./storiesComponents/StoryDetail";
import StorySearchBar from "./storiesComponents/StorySearchBar";
import "../styles/Stories.css";

const Stories = props => {
  useEffect(() => {
    document.body.style.padding = 0;
    document.body.style.height = "100%";
  }, []);

  const [stories, setStories] = useState([
    {
      title: "News Report",
      hyperlink: "https://www.google.com",
      rating: 10,
      date: new Date("2009-04-19T00:32:00.000Z")
    },
    {
      title: "News Report",
      hyperlink: "https://www.google.com",
      rating: 10,
      date: new Date("2009-04-19T00:32:00.000Z")
    },
    {
      title: "News Report",
      hyperlink: "https://www.google.com",
      rating: 10,
      date: new Date("2009-04-19T00:32:00.000Z")
    },
    {
      title: "News Report",
      hyperlink: "https://www.google.com",
      rating: 10,
      date: new Date("2009-04-19T00:32:00.000Z")
    },
    {
      title: "News Report",
      hyperlink: "https://www.google.com",
      rating: 10,
      date: new Date("2009-04-19T00:32:00.000Z")
    }
  ]);

  let useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let term = query.get("storyTitle");

  return (
    <>
      <Nav />
      <div id="stories-background"></div>
      <section className="stories-container">
        <StorySearchBar searchTerm={term} {...props} />
        {stories.map(story => (
          <StoryDetail story={story} />
        ))}
      </section>
      <div style={{ backgroundColor: "black", height: "100%" }}></div>
    </>
  );
};

export default Stories;
