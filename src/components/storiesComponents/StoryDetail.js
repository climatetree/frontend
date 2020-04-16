import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { UserContext } from "../context/UserContext";
import Can from "../loginComponents/Can";
import LikeFlagButtonGroup from "./LikeCommentButtonGroup";
import StoryCommentsList from "./StoryCommentsList";
import StoryCommentInput from "./StoryCommentInput";
import StoryPreview from "../generalComponents/StoryPreview";

const StoryDetail = ({ story, deleteStoryHandler }) => {
  let userLikesGroup = new Set();
  for (let userId of story.liked_by_users) {
    userLikesGroup.add(userId);
  }
  let userFlagGroup = new Set();
  for (let userId of story.flagged_by_users) {
    userFlagGroup.add(userId);
  }

  let [toggleComment, setToggleComment] = useState(false);
  let [toggleViewComment, setToggleViewComment] = useState(false);
  let [userLikesGroupState, setUserLikesGroup] = useState(userLikesGroup);
  let [userFlagGroupState, setUserFlagGroup] = useState(userFlagGroup);
  let [comments, setComments] = useState(story.comments);
  let [storyView, setStoryView] = useState({});
  let [doneLoading, setDoneLoading] = useState(false);

  // New updated code to get user and role.
  const { user } = useContext(UserContext);
  const { role } = user;

  useEffect(() => {
    (async () => {
      const storyPreview = await axios.get(
        `https://climatetree-api-gateway.azurewebsites.net/stories/getPreview?hyperlink=${encodeURIComponent(
          story.hyperlink
        )}`
      );

      setStoryView({
        ...storyPreview.data,
        story_title: storyPreview.data["title"],
        hyperlink: story.hyperlink,
      });

      setDoneLoading(true);
    })();
  }, []);

  const onToggleComment = () => {
    setToggleComment((prevToggleCommentState) => !prevToggleCommentState);
  };

  const onToggleViewComment = () => {
    setToggleViewComment(
      (prevToggleViewCommentState) => !prevToggleViewCommentState
    );
  };

  const onChangeUsersLikesGroup = (action, userId) => {
    if (action === "like") {
      setUserLikesGroup((prevUserLikesGroupState) =>
        new Set(prevUserLikesGroupState).add(parseInt(userId))
      );
    } else {
      setUserLikesGroup((prevUserLikesGroupState) => {
        const newUserLikesGroupState = new Set(prevUserLikesGroupState);
        newUserLikesGroupState.delete(parseInt(userId));

        return newUserLikesGroupState;
      });
    }
  };

  const onChangeUsersFlagGroup = (action, userId) => {
    if (action === "flag") {
      setUserFlagGroup((prevUserFlagGroupState) =>
        new Set(prevUserFlagGroupState).add(parseInt(userId))
      );
    } else {
      setUserFlagGroup((prevUserFlagGroupState) => {
        const newUserFlagGroupState = new Set(prevUserFlagGroupState);
        newUserFlagGroupState.delete(parseInt(userId));

        return newUserFlagGroupState;
      });
    }
  };

  const openViewComment = () => {
    setToggleViewComment(true);
  };

  const onChangeAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const onChangeDeleteComment = (commentId) => {
    setComments((prevComments) => [
      ...prevComments.filter((c) => c.comment_id !== commentId),
    ]);
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
          <StoryPreview
            key={story.story_id}
            story={storyView}
            cssScope="profile"
          />
        </div>

        {/* Must be moderator or admin to view this section */}
        {(role <= 2 || user.userId === story.user_id) && doneLoading && (
          <div className="mod-controls">
            <div
              role="button"
              className="delete-story-btn"
              onClick={() => deleteStoryHandler(story.story_id, user.jwt)}
            >
              <i className="far fa-trash-alt"></i>
              Delete Story
            </div>
          </div>
        )}

        <div>
          <div className="created-detail">
            Created:{" "}
            {`${
              story.date.getUTCMonth() + 1
            }/${story.date.getUTCDate()}/${story.date.getUTCFullYear()}`}
          </div>
        </div>

        <div className="likes-flag-view">
          <div className="liked-count">{userLikesGroupState.size} Likes</div>
          {comments.length > 0 && (
            <div
              role="button"
              className="view-comments-btn"
              onClick={onToggleViewComment}
            >
              <span>{comments.length} Comments</span>
            </div>
          )}
        </div>
      </div>

      <hr className="story-detail-hr"></hr>
      <Can
        role={role}
        perform="posts:like"
        yes={() => (
          <LikeFlagButtonGroup
            story={story}
            onChangeUsersLikesGroup={onChangeUsersLikesGroup}
            onChangeUsersFlagGroup={onChangeUsersFlagGroup}
            userLikesGroupState={userLikesGroupState}
            userFlagGroupState={userFlagGroupState}
          />
        )}
      />
      {toggleViewComment && (
        <StoryCommentsList
          comments={comments}
          storyId={story.story_id}
          onChangeDeleteComment={onChangeDeleteComment}
        />
      )}
      <Can
        role={role}
        perform="posts:like"
        yes={() => (
          <StoryCommentInput
            toggleComment={toggleComment}
            story={story}
            comments={comments}
            toggleViewComment={toggleViewComment}
            openViewComment={openViewComment}
            onChangeAddComment={onChangeAddComment}
          />
        )}
      />
    </div>
  );
};

export default StoryDetail;
