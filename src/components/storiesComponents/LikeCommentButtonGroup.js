import React, { useContext } from "react";
import axios from "axios";

import StoryCommentInput from "./StoryCommentInput";
import authContext from "../context/authContext";

const LikeCommentButtonGroup = ({
  onToggleComment,
  toggleComment,
  story,
  onChangeUsersLikesSet,
  // likedByUsers,
  userLikesSetState
}) => {
  const [{ userid }] = useContext(authContext);
  const { story_id, liked_by_users } = story;

  console.log(userid);

  const likeService = async (storyId, userId, action) => {
    const options = {
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("JWT"),
        "Content-Type": "application/json"
      }
    };

    const response = await axios.put(
      `https://climatetree-api-gateway.azurewebsites.net/stories/${storyId}/${action}/${userId}`,
      null,
      options
    );

    // const userIsFound = likedByUsers.find(user => user.toString() === userid);

    const userIsFound = userLikesSetState.has(parseInt(userId));

    // 1. If users want to like and that user is not found, user can like.
    //    Otherwise, user cannot like anymore.
    // 2. If users want to dislike and that user is found, user can dislike.
    //    Otherwise, user cannot dislike anymore.
    if (response) {
      if (action === "like" && !userIsFound) {
        onChangeUsersLikesSet(action, userId);
      } else if (action === "unlike" && userIsFound) {
        onChangeUsersLikesSet(action, userId);
      }
    }
  };

  const renderLikeDislikeButton = () => {
    // const userIsFound = likedByUsers.find(user => user.toString() === userid);
    const userIsFound = userLikesSetState.has(parseInt(userid));
    const action = !userIsFound ? "like" : "unlike";

    console.log("HELLO");

    return (
      <span
        className="like-button"
        onClick={() => likeService(story_id, userid, action)}
      >
        <i
          className={`${!userIsFound ? "far " : "fas "}fa-heart${
            !userIsFound ? "" : " liked"
          }`}
        ></i>{" "}
        <span className="like-comment-font-mobile">
          {!userIsFound ? " Give it a heart" : " Dislike"}
        </span>
      </span>
    );
  };

  return (
    <div>
      <div className="like-comment-section">
        <div className="button-group">
          {renderLikeDislikeButton()}
          <span className="comment-button" onClick={() => onToggleComment()}>
            <i className="far fa-comment"></i>{" "}
            <span className="like-comment-font-mobile">Post Comment</span>
          </span>
        </div>
      </div>
      <StoryCommentInput toggleComment={toggleComment} />
    </div>
  );
};

export default LikeCommentButtonGroup;
