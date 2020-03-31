import React, { useContext, useState, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import PostStoryForm from './PostStoryForm';
import plusIcon from '../../images/plus.svg';
import { UserContext } from "../context/UserContext";
import './Profile.css';

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
  const { user } = useContext(UserContext);
  const [openPostStoryForm, setOpenPostStoryForm] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [tStories, setTStories] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://backend-mongo-stories.azurewebsites.net/stories/topStories/3`);
      const topStories = await res.json();
      setTStories(topStories);
    })();
  }, []);
  return (
    <div className="profile-wrapper">
      <div className="profile">
        <div className="greeting">
          <p>Welcome</p>
          <p>{user.username}</p>
        </div>
      </div>
      <div className="stories-wrapper">
        <h2>My stories</h2>
        <div className="personal stories">
          {myStories.map(({ hyperlink }, index) => (
            <ReactTinyLink
              key={index}
              cardSize="small"
              showGraphic={true}
              // description={description}
              maxLine={3}
              minLine={3}
              url={hyperlink}
            />
          ))}
          <div
            className="post-story"
            onClick={() => setOpenPostStoryForm(true)}
          >
            <img src={plusIcon} alt="post story icon"/>
            <p>post a story</p>
          </div>
        </div>
        <h2>Trending</h2>
        <div className="trending stories">
          {tStories.map(({description, hyperlink}, index) => (
            <ReactTinyLink
              key={index}
              cardSize="small"
              showGraphic={true}
              description={description}
              maxLine={3}
              minLine={3}
              url={hyperlink}
            />
          ))}
        </div>
      </div>
      {openPostStoryForm &&
        <PostStoryForm
          setOpenPostStoryForm={setOpenPostStoryForm}
          myStories={myStories}
          setMyStories={setMyStories}
        />
      }
    </div>
  );
}