import React, { useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";

import "../../styles/ExploreScreen.css";

function ExploreScreen() {
  useEffect(() => {
    console.log("HELLO FROM EXPLORE!!");
  });

  return (
    <section id="explore-screen">
      <h2 id="explore-header">Explore Top Popular Stories</h2>
      <div className="explore-tile">
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          width={300}
          url={"https://en.wikipedia.org/wiki/Seattle"}
        />
      </div>
      <div className="explore-tile">
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          width={300}
          url={"https://en.wikipedia.org/wiki/Los_Angeles"}
        />
      </div>
      <div className="explore-tile">
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          width={300}
          url={"https://en.wikipedia.org/wiki/Japan"}
        />
      </div>
      {/* <div className="explore-tile">
        <img src="https://picsum.photos/240/100" alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod eaque
          sunt velit ducimus! Possimus, ex a fugiat voluptatem nostrum aut.
        </p>
      </div>
      <div className="explore-tile">
        <img src="https://picsum.photos/240/100" alt="" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod eaque
          sunt velit ducimus! Possimus, ex a fugiat voluptatem nostrum aut.
        </p>
      </div> */}
    </section>
  );
}

export default ExploreScreen;
