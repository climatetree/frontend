import React, { useContext, useState, useEffect } from "react";
import PostStoryForm from "./PostStoryForm";
import plusIcon from "../../images/plus.svg";
import { UserContext } from "../context/UserContext";
import StoryPreview from './StoryPreview';
import "./Profile.css";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [openPostStoryForm, setOpenPostStoryForm] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  async function* generateStoryImage(stories) {
    for (const story of stories) {
      const response = await fetch(`https://backend-mongo-stories.azurewebsites.net/stories/getPreview?hyperlink=${encodeURIComponent(story.hyperlink)}`);
      const preview = await response.json();
      yield {
        ...story,
        image: preview.image,
      };
    }
  }
  useEffect(() => {
    (async () => {
      const res = await fetch('https://backend-mongo-stories.azurewebsites.net/stories/topStories/3'); // for development
      // const res = await fetch('https://climatetree-api-gateway.azurewebsites.net/stories/topStories/3');
      const topStories = await res.json();
      const results = [];
      const storyImageGenerator = generateStoryImage(topStories);
      for await (const updatedStory of storyImageGenerator) {
        results.push(updatedStory);
      }
      setTrendingStories(results);
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
      <div className="story-lists-wrapper">
        <h2>My stories</h2>
        <div className="personal story-list">
          {myStories.map((story, index) => (
            <StoryPreview key={index} story={story} />
          ))}
          <div
            className="post-story"
            onClick={() => setOpenPostStoryForm(true)}
          >
            <img src={plusIcon} alt="post story icon" />
            <p>post a story</p>
          </div>
        </div>
        <h2>Trending</h2>
        <div className="trending story-list">
          {trendingStories.length === 0 ? (
            <p className="loading">loading...</p>
          ) : (
            <>
              {trendingStories.map(story => (
                <StoryPreview key={story.story_id} story={story} />
              ))}
            </>
          )}
        </div>
      </div>
      {openPostStoryForm && (
        <PostStoryForm
          setOpenPostStoryForm={setOpenPostStoryForm}
          myStories={myStories}
          setMyStories={setMyStories}
        />
      )}
    </div>
  );
}
