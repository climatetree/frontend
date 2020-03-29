import React, { useState, useEffect, useContext } from "react";
import { ReactTinyLink } from "react-tiny-link";

import { UserContext } from "../context/UserContext";
import Can from "../loginComponents/Can";
import LikeCommentButtonGroup from "./LikeCommentButtonGroup";

const StoryDetail = ({ story }) => {
  let userLikesSet = new Set();

  for (let userId of story.liked_by_users) {
    userLikesSet.add(userId);
  }

  let [toggleComment, setToggleComment] = useState(false);
  let [userLikesSetState, setUserLikesSet] = useState(userLikesSet);

  // New updated code to get user and role.
  const { user } = useContext(UserContext);
  const { role } = user;

  const onToggleComment = () => {
    setToggleComment(prevToggleCommentState => !prevToggleCommentState);
  };

  const onChangeUsersLikesSet = (action, userId) => {
    if (action === "like") {
      setUserLikesSet(prevUserLikesSetState =>
        new Set(prevUserLikesSetState).add(parseInt(userId))
      );
    } else {
      setUserLikesSet(prevUserLikesSetState => {
        const newUserLikesSetState = new Set(prevUserLikesSetState);
        newUserLikesSetState.delete(parseInt(userId));

        return newUserLikesSetState;
      });
    }
  };

  return (
    <div className="story-card">
      <div className="heading-card-section">
        <a
          href={story.hyperlink}
          target="_blank"
          rel="noopener noreferrer"
          className="title-hyperlink"
        >
          <h3>{story.story_title}</h3>
        </a>

        <div className="link-preview-container">
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={3}
            minLine={1}
            url={story.hyperlink}
          />
        </div>

        <div>
          <div className="created-detail">
            Created:{" "}
            {`${story.date.getUTCMonth() +
              1}/${story.date.getUTCDate()}/${story.date.getUTCFullYear()}`}
          </div>
          <div className="liked-count">{userLikesSetState.size} Likes</div>
        </div>
      </div>

      <hr></hr>
      <Can
        role={role}
        perform="posts:like"
        yes={() => (
          <LikeCommentButtonGroup
            story={story}
            onToggleComment={onToggleComment}
            onChangeUsersLikesSet={onChangeUsersLikesSet}
            userLikesSetState={userLikesSetState}
            toggleComment={toggleComment}
          />
        )}
      />
    </div>
  );
};

export default StoryDetail;
