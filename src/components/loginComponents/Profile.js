import React, { useContext, useState, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import PostStoryForm from './PostStoryForm';
import plusIcon from '../../images/plus.svg';
import authContext from "../context/authContext";
import './Profile.css';

const pendingStories = [{
  description: "Seattle (/siˈætəl/ (About this soundlisten) see-AT-əl) is a seaport city on the West Coast of the United States. It is the seat of King County, Washington. With an estimated 744,955 residents as of 2018, Seattle is the largest city in both the state of Washington and the Pacific Northwest region of North America.",
  url: "https://en.wikipedia.org/wiki/Seattle",
}, {
  description: "Los Angeles (/lɔːs ˈændʒələs/ (About this soundlisten);[a] Spanish: Los Ángeles; Spanish for '\"The Angels\"'),[16] officially the City of Los Angeles and often known by its initials L.A., is the most populous city in California; the second most populous city in the United States, after New York City; and the third most populous city in North America, after Mexico City and New York City.",
  url: "https://en.wikipedia.org/wiki/Los_Angeles",
}];
const myStories = [];
const trendingStories = [{
  description: "Seattle (/siˈætəl/ (About this soundlisten) see-AT-əl) is a seaport city on the West Coast of the United States. It is the seat of King County, Washington. With an estimated 744,955 residents as of 2018, Seattle is the largest city in both the state of Washington and the Pacific Northwest region of North America.",
  url: "https://en.wikipedia.org/wiki/Seattle",
}, {
  description: "Los Angeles (/lɔːs ˈændʒələs/ (About this soundlisten);[a] Spanish: Los Ángeles; Spanish for '\"The Angels\"'),[16] officially the City of Los Angeles and often known by its initials L.A., is the most populous city in California; the second most populous city in the United States, after New York City; and the third most populous city in North America, after Mexico City and New York City.",
  url: "https://en.wikipedia.org/wiki/Los_Angeles",
}, {
  description: "New York City (NYC), often called the City of New York or simply New York (NY), is the most populous city in the United States. With an estimated 2018 population of 8,398,748 distributed over about 302.6 square miles (784 km2), New York is also the most densely populated major city in the United States.",
  url: "https://en.wikipedia.org/wiki/New_York_City",
}];

export default function Profile() {
  const [{ username }] = useContext(authContext);
  const [openPostStoryForm, setOpenPostStoryForm] = useState(false);
  useEffect(() => {
  }, []);
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="greeting">
          <p>Welcome</p>
          <p>{username}</p>
        </div>
      </div>
      <div className="stories-wrapper">
        <h2>Pending</h2>
        <div className="pending stories">
          {pendingStories.length ? (
            <>
              {pendingStories.map(({description, url}, index) => (
                <div
                  key={index}
                  className="pending-wrapper"
                >
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    description={description}
                    maxLine={3}
                    minLine={3}
                    url={url}
                  />
                  <div className="story-btn-wrapper">
                    <button className="story-btn">Approve</button>
                    <button className="story-btn">Delete</button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p style={{ textTransform: "capitalize" }}>No pending stories</p>
          )}
        </div>
        <h2>My stories</h2>
        <div className="personal stories">
          {myStories.length ? (
            <>
              {myStories.map(({description, url}, index) => (
                <ReactTinyLink
                  key={index}
                  cardSize="small"
                  showGraphic={true}
                  description={description}
                  maxLine={3}
                  minLine={3}
                  url={url}
                />
              ))}
            </>
          ) : (
            <div
              className="post-story"
              onClick={() => setOpenPostStoryForm(true)}
            >
              <img src={plusIcon} alt="post story icon"/>
              <p>post a story</p>
            </div>
          )}
        </div>
        <h2>Trending</h2>
        <div className="trending stories">
          {trendingStories.map(({description, url}, index) => (
            <ReactTinyLink
              key={index}
              cardSize="small"
              showGraphic={true}
              description={description}
              maxLine={3}
              minLine={3}
              url={url}
            />
          ))}
        </div>
      </div>
      {openPostStoryForm &&
        <PostStoryForm
          setOpenPostStoryForm={setOpenPostStoryForm}
        />
      }
    </div>
  );
}