import React from "react";

const GeneralTopic = () => {
  return (
    <div className="help-topic">
      <div className="help-header">
        <h2 className="help-title">ClimateTree&trade; Purpose</h2>
        <hr className="help-hr"></hr>
        <p className="topic-explanation">
          ClimateTree&trade; is a center for gathering ideas and stories about
          climate solutions and supporting resilience -- person by person and
          community by community--across the globe.
        </p>
        <br />
        <p className="topic-explanation">
          Learn more about{" "}
          <a
            className="video-link"
            href="https://www.youtube.com/watch?v=Ok8rMT2KCy0"
            target="_blank"
          >
            climate change
          </a>
        </p>
      </div>

      <div className="help-body">
        <div className="help-content-paragraph">
          <h2 className="help-title">ClimateTree&trade; Approach</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            We live on one planet, but we live in different places, under
            different circumstances. ClimateTree&trade; organizes climate change
            Solutions by geography and by type. You can use filters on both the
            “Stories” and “Map” function to find the solutions that are the most
            relevant to you and your community. You can also help in this effort
            through the “Research” function, by uploading a story with geography
            and type information.
            {/* PUT BUTTON TO NAVIGATE TO MAPS, STORIES, AND RESEARCH HELP PAGE */}
          </p>
          <br />
          <p className="topic-explanation">
            ClimateTree’s&trade; fundamental units are called “solution
            stories”. It is our hope that by sharing this content, users will
            gain hope, insight, and practical information about how to approach
            climate change solutions in their own locale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralTopic;
