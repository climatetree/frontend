import React, { useContext, useState, useEffect } from "react";
import { ReactTinyLink } from "react-tiny-link";
import PostStoryForm from './PostStoryForm';
import plusIcon from '../../images/plus.svg';
import { UserContext } from "../context/UserContext";
import './Profile.css';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [openPostStoryForm, setOpenPostStoryForm] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://backend-mongo-stories.azurewebsites.net/stories/topStories/3`);
      const topStories = await res.json();
      setTrendingStories(topStories);
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
          <div style={{ maxWidth: '100%' }}>
            {trendingStories.map(({description, hyperlink}, index) => (
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