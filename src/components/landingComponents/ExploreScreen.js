import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactTinyLink } from "react-tiny-link";

import "./ExploreScreen.css";

function ExploreScreen() {
  useEffect(() => {
    (async () => {
      const numberOfStories = 3;
      const response = await axios.get(
        `https://backend-mongo-stories.azurewebsites.net/stories/topStories/${numberOfStories}`
      );

      setPopularStories(response.data);
    })();
  });

  const [popularStories, setPopularStories] = useState([]);

  return (
    <section id="explore-screen">
      <h2 id="explore-header">Explore Top Popular Stories</h2>
      {/* {popularStories.map(ps => (
        <div className="explore-tile">
          <ReactTinyLink
            cardSize="large"
            showGraphic={true}
            // description={ps.description}
            maxLine={3}
            minLine={3}
            url={ps.hyperlink}
          />
        </div>
      ))} */}
      <div className="explore-tile">
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          description={
            "Seattle (/siˈætəl/ (About this soundlisten) see-AT-əl) is a seaport city on the West Coast of the United States. It is the seat of King County, Washington. With an estimated 744,955 residents as of 2018, Seattle is the largest city in both the state of Washington and the Pacific Northwest region of North America."
          }
          maxLine={3}
          minLine={3}
          url={"https://en.wikipedia.org/wiki/Seattle"}
        />
      </div>
      <div className="explore-tile">
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          description={
            "Los Angeles (/lɔːs ˈændʒələs/ (About this soundlisten);[a] Spanish: Los Ángeles; Spanish for '\"The Angels\"'),[16] officially the City of Los Angeles and often known by its initials L.A., is the most populous city in California; the second most populous city in the United States, after New York City; and the third most populous city in North America, after Mexico City and New York City."
          }
          maxLine={3}
          minLine={3}
          url={"https://en.wikipedia.org/wiki/Los_Angeles"}
        />
      </div>
      <div className="explore-tile">
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          description={
            "Japan (Japanese: 日本, Nippon [ɲippoꜜɴ] (About this soundlisten) or Nihon [ɲihoꜜɴ] (About this soundlisten); officially 日本国, About this soundNippon-koku or Nihon-koku) is an island country located in East Asia. It is bordered by the Sea of Japan to the west and the Pacific Ocean to the east, and spans from the Sea of Okhotsk in the north to the East China Sea and Philippine Sea in the south."
          }
          maxLine={3}
          minLine={3}
          url={"https://en.wikipedia.org/wiki/Japan"}
        />
      </div>
    </section>
  );
}

export default ExploreScreen;
