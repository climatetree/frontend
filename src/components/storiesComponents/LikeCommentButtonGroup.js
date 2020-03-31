import React, { useContext } from "react";
import axios from "axios";

import StoryCommentInput from "./StoryCommentInput";
import { UserContext } from "../context/UserContext";

const LikeCommentButtonGroup = ({
  onToggleComment,
  toggleComment,
  story,
  comments,
  onChangeUsersLikesSet,
  onChangeAddComment,
  userLikesSetState
}) => {
  const { user } = useContext(UserContext);

  const { userId, jwt } = user;
  const { story_id } = story;

  const likeService = async (storyId, user_id, action) => {
    const options = {
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json"
      }
    };

    const response = await axios.put(
      `https://climatetree-api-gateway.azurewebsites.net/stories/${storyId}/${action}/${user_id}`,
      null,
      options
    );

    const userIsFound = userLikesSetState.has(parseInt(user_id));

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
    const userIsFound = userLikesSetState.has(parseInt(userId));
    const action = !userIsFound ? "like" : "unlike";

    return (
      <span
        className="like-button"
        onClick={async () => await likeService(story_id, userId, action)}
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
          <a
            href={`#${story_id}`}
            className="comment-button"
            onClick={() => onToggleComment()}
          >
            <i className="far fa-comment"></i>{" "}
            <span className="like-comment-font-mobile">Post Comment</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LikeCommentButtonGroup;
