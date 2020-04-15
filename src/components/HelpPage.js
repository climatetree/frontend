import React from "react";

import Nav from "./Nav";

import "./HelpPage.css";

const HelpPage = () => {
  return (
    <>
      <Nav />
      <div id="help-background"></div>
      <div id="help-container">
        <div className="help-sidebar">
          <div className="help-sidenav-item">General</div>
          <div className="help-sidenav-item">Map</div>
          <div className="help-sidenav-item">Stories</div>
        </div>
        <div className="help-topic">
          <div className="help-header">
            <h2 className="help-title">Getting Started</h2>
            <p id="understand-climate-tree">
              Understanding climate change with ClimateTree
            </p>
          </div>

          <div className="help-body">
            <div className="help-content-paragraph">
              <h2 className="help-title">ClimateTree Purpose</h2>
              <hr id="help-hr"></hr>
              <p className="topic-explanation">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div className="help-content-paragraph">
              <h2 className="help-title">Climate Change Summary</h2>
              <hr id="help-hr"></hr>
              <p className="topic-explanation">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div className="video-link">
              <h2 className="help-title">Video &amp; Links</h2>
              <hr id="help-hr"></hr>
              <ul className="list-videos-link">
                <li className="bullet-point">
                  <a
                    href="https://www.youtube.com/watch?v=Ok8rMT2KCy0"
                    className="link-item"
                    target="_blank"
                  >
                    What is ClimateTree?
                  </a>
                </li>
                <li className="bullet-point">
                  <a
                    href="https://www.youtube.com/watch?v=Ok8rMT2KCy0"
                    className="link-item"
                    target="_blank"
                  >
                    Climate Change summary
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpPage;
