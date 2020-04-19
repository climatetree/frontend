/**
 * User personnal page 
 */
import React, { useContext, useState, useEffect } from "react";
import PostStoryForm from "./PostStoryForm";
import ChangeUserRoleForm from "./ChangeUserRoleForm";
import plusIcon from "../../images/plus.svg";
import userIcon from "../../images/user.svg";
import { UserContext } from "../context/UserContext";
import StoryPreview from '../generalComponents/StoryPreview';
import { fetchAllUserStories, fetchTopStories } from './helper';
import "./Profile.css";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [openPostStoryForm, setOpenPostStoryForm] = useState(false);
  const [openChangeUserRoleForm, setOpenChangeUserRoleForm] = useState(false);
  const [myStories, setMyStories] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);

  useEffect(() => {
    (async () => {
      setMyStories(await fetchAllUserStories(user));
      setTrendingStories(await fetchTopStories(3));
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
          <>
            <h2>User Management</h2>
            <div className="story-list">
              <div
                className="post-form"
                onClick={() => setOpenChangeUserRoleForm(true)}
              >
                <img src={userIcon} alt="update user icon" />
                <p>Update User Role</p>
              </div>
            </div>
          </>
        )}
        {/* User Stories and Post Story */}
        <h2>My stories</h2>
        <div className="personal story-list">
          <div
            className="post-form"
            onClick={() => setOpenPostStoryForm(true)}
          >
            <img src={plusIcon} alt="post story icon" />
            <p>post a story</p>
          </div>
          {myStories.map((story, index) => (
            <StoryPreview
              key={story.story_id}
              story={story}
              updateStories={(updated) => {
                setMyStories([
                  ...myStories.slice(0, index),
                  updated,
                  ...myStories.slice(index + 1),
                ])
              }}
              removeStory={() => {
                setMyStories([
                  ...myStories.slice(0, index),
                  ...myStories.slice(index + 1),
                ])
              }}
              cssScope="profile"
            />
          ))}
        </div>
        {/* Trending Stories */}
        <h2>Trending</h2>
        <div className="trending story-list">
          {trendingStories.length === 0 ? (
            <p className="loading">loading...</p>
          ) : (
            <>
              {trendingStories.map((story, index) => (
                <StoryPreview
                  key={story.story_id}
                  story={story}
                  updateStories={(updated) => {
                    setTrendingStories([
                      ...trendingStories.slice(0, index),
                      updated,
                      ...trendingStories.slice(index + 1),
                    ])
                  }}
                  removeStory={async () => {
                    setTrendingStories([]);
                    const results = await fetchTopStories(3);
                    setTrendingStories(results);
                  }}
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