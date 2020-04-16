import React from "react";

const GeneralTopic = () => {
  return (
    <div className="help-topic">
      <div className="help-header">
        <h2 className="help-title">ClimateTree Purpose</h2>
        <hr className="help-hr"></hr>
        <p className="topic-explanation">
          The purpose of ClimateTree is to gather the world’s ideas, stories,
          and research about solutions for Climate Change.
        </p>
        <br />
        <p className="topic-explanation">
          Learn more about{" "}
          <a
            className="video-link"
            href="https://www.youtube.com/watch?v=Ok8rMT2KCy0"
          >
            Climate Change
          </a>
        </p>
      </div>

      <div className="help-body">
        <div className="help-content-paragraph">
          <h2 className="help-title">ClimateTree Approach</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            We live on one planet, but we live in different places, under
            different circumstances. ClimateTree organizes Climate Change
            Solutions by geography and by type. You can use filters on both the
            “Stories” and “Map” function to find the solutions that are the most
            relevant to you and your community. You can also help in this effort
            through the “Research” function, by uploading a story with geography
            and type information.
            {/* PUT BUTTON TO NAVIGATE TO MAPS, STORIES, AND RESEARCH HELP PAGE */}
          </p>
          <br />
          <p className="topic-explanation">
            ClimateTree’s fundamental units are called “solution stories”. It is
            our hope that by sharing this content, users will gain hope,
            insight, and practical information about how to approach climate
            change solutions in their own locale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralTopic;
