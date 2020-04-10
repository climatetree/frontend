/**
 * User personnal page 
 */
import React, { useContext, useState, useEffect } from "react";
import PostStoryForm from "./PostStoryForm";
import ChangeUserRoleForm from "./ChangeUserRoleForm";
import plusIcon from "../../images/plus.svg";
import { UserContext } from "../context/UserContext";
import StoryPreview from '../generalComponents/StoryPreview';
import { generateStoryImage } from './helper';
import "./Profile.css";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [openPostStoryForm, setOpenPostStoryForm] = useState(false);
  const [openChangeUserRoleForm, setOpenChangeUserRoleForm] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);

  // Retrieve top stories
  useEffect(() => {
    (async () => {
      const res = await fetch('https://climatetree-api-gateway.azurewebsites.net/stories/topStories/3');
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
        {/* Admin Functionality */}
        {user.role === 1 && (
          <div className="admin-wrapper">
            <h2>User Mangement</h2>
            <div className="story-list">
              <div
                className="post-form"
                onClick={() => setOpenChangeUserRoleForm(true)}
              >
                <img src={plusIcon} alt="update user icon" />
                <p>Update User Role</p>
              </div>
            </div>
          </div>
        )}

        {/* User Stories and Post Story */}
        <h2>My stories</h2>
        <div className="personal story-list">
          {myStories.map((story, index) => (
            <StoryPreview key={index} story={story} />
          ))}
          <div
            className="post-form"
            onClick={() => setOpenPostStoryForm(true)}
          >
            <img src={plusIcon} alt="post story icon" />
            <p>post a story</p>
          </div>
        </div>

        {/* Trending Stories */}
        <h2>Trending</h2>
        <div className="trending story-list">
          {trendingStories.length === 0 ? (
            <p className="loading">loading...</p>
          ) : (
              <>
                {trendingStories.map(story => (
                  <StoryPreview
                    key={story.story_id}
                    story={story}
                    cssScope="profile"
                  />
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

      {openChangeUserRoleForm && (
        <ChangeUserRoleForm
          setOpenChangeUserRoleForm={setOpenChangeUserRoleForm}
        />
      )}
    </div>
  );
}
