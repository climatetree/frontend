import React, { useState, useEffect } from "react";

import StoryDetail from "./storiesComponents/StoryDetail";
import Nav from "./Nav";
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

  return (
    <>
      <Nav />
      <div id="stories-background"></div>
      <section className="stories-container">
        {stories.map(story => (
          <StoryDetail story={story} />
        ))}
      </section>
      <div style={{ backgroundColor: "black", height: "100%" }}></div>
    </>
  );
};

export default Stories;
