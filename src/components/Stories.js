import React, { useState } from "react";

import StoryDetail from "./storiesComponents/StoryDetail";

const Stories = () => {
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
    }
  ]);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      {stories.map(story => (
        <StoryDetail story={story} />
      ))}
    </div>
  );
};

export default Stories;
