import React from "react";
import { none } from "ol/centerconstraint";

const StoriesTopic = () => {
  return (
    <div className="help-topic">
      <div className="help-header">
        <p className="objective">
          "Explore any kind of climate change solutions anywhere in the world"
        </p>
      </div>
      <div className="help-body">
        <div className="help-content-paragraph">
          <h2 className="help-title">ClimateTree Stories Organization</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            ClimateTree’s fundamental units are called “solution stories”. By
            sharing this content, users will gain hope, insight, and practical
            information about how to approach climate change solutions in their
            own locale.
          </p>
          <br />
          <p className="topic-explanation">
            Not all solution stories, however, are relevant to all places
            because of geographic and demographic characteristics. Thus, we have
            suggested a “taxonomy”, or organizational hierarchy, for the
            branches of the ClimateTree. We also have our “Map” function if you
            would like to filter by geography.
          </p>
        </div>
        <div className="help-content-paragraph">
          <h2 className="help-title">
            2 Strategies: Mitigation &amp; Adaptation
          </h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            At the highest level of organization, ClimateTree has a split trunk,
            each representing one of two overarching strategies: mitigation and
            adaptation. Mitigation describes efforts and ideas that reduce the
            amount of carbon in the atmosphere, whereas Adaptation describes the
            efforts and ideas that deal with the consequences of high amounts of
            carbon in the atmosphere. We acknowledge that some solutions address
            both strategies.
          </p>
          <br />
          <br />
          <ul className="list-videos-link">
            <li className="bullet-point">
              <a
                className="video-link"
                href="https://www.youtube.com/watch?v=LFane7eS9Ys"
                target="_blank"
                rel="noopener noreferrer"
              >
                More about Mitigation
              </a>
            </li>
            <li className="bullet-point">
              <a
                className="video-link bullet-point"
                href="https://www.youtube.com/watch?v=FO46sPwm4xk"
                target="_blank"
                rel="noopener noreferrer"
              >
                More about Adaptation
              </a>
            </li>
          </ul>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">17 Sectors</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Each climate change strategy in turn, splits into several unique
            branches called “sectors” - there are 17 in total. Some of the 7
            mitigation sectors are “food”, “land use”, and “transport”; some of
            the 10 adaptation sectors are “technological”, “behavioral”, and
            “laws and regulations”.
          </p>
          <br />
          <p className="topic-explanation">
            Learn more about the
            <a
              className="video-link"
              href="https://www.youtube.com/watch?v=WxyfbLRBRCg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sectors
            </a>
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">205 Solutions</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Each sector, in turn, splits into smaller branches called solutions.
            There are about 200 unique solutions when all sectors and strategies
            are considered. Users are able to filter stories by solutions.
          </p>
          <br />
          <p className="topic-explanation">
            Learn more about the
            <a
              className="video-link"
              href="https://www.youtube.com/watch?v=WxyfbLRBRCg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solutions
            </a>
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">Millions of Stories</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Finally, the solution stories are the units of content of the
            ClimateTree - leaves, buds, flowers, and fruits if you will Some of
            these are produced by ClimateTree’s automated tools and team, and
            others are brought in by users using the “Upload” function. All
            stories are essentially hyperlinks tagged by location and solution.
          </p>
          <br />
          <p className="topic-explanation">
            Make sure to like and comment on the Stories you see!
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">Sources</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            {/* MAKE ANCHOR TAG ON "Project Drawdown" */}
            Mitigation Sectors and Solutions: For more information on the
            mitigation strategy climate change sectors and solutions please
            visit the{" "}
            <a
              className="video-link"
              href="https://drawdown.org/solutions/table-of-solutions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Drawdown
            </a>{" "}
            website. These solutions were chosen through several criteria
            explained in their FAQ.
          </p>
          <br />
          <p className="topic-explanation">
            Adaptation Sectors and Solutions: For more information on the
            adaptation strategy climate change sectors and solutions please see
            Chapter 14 (page 845) of the{" "}
            <a
              className="video-link"
              href="https://www.ipcc.ch/report/ar5/wg2/"
              target="_blank"
              rel="noopener noreferrer"
            >
              AR5 Climate Change 2014: Impacts, Adaptation, and Vulnerability
            </a>{" "}
            report produced by the Intergovernmental Panel on Climate Change
            (“IPCC”).
          </p>
          <br />
          <p className="topic-explanation important">
            <strong>
              STORIES: Any content from the worldwide web uploaded by YOU and
              <span style={{ textTransform: "none", marginLeft: "5px" }}>
                ClimateTree
              </span>
              , curated by our experts.
            </strong>
          </p>
        </div>

        <div className="help-content-paragraph">
          <h2 className="help-title">Notes</h2>
          <hr className="help-hr"></hr>
          <p className="topic-explanation">
            Additional strategies/sectors/solutions or taxonomies may be added
            in the future, such as “climate change disasters” or “climate
            justice solutions”. We are actively seeking collaborators to inform
            and improve this catalog.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoriesTopic;
