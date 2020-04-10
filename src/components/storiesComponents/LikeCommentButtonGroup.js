import React, { useContext } from "react";
import axios from "axios";

import { UserContext } from "../context/UserContext";

const LikeCommentButtonGroup = ({
  story,
  onChangeUsersLikesGroup,
  onChangeUsersFlagGroup,
  userLikesGroupState,
  userFlagGroupState,
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

    const userIsFound = userLikesGroupState.has(parseInt(user_id));

    // 1. If users want to like and that user is not found, user can like.
    //    Otherwise, user cannot like anymore.
    // 2. If users want to dislike and that user is found, user can dislike.
    //    Otherwise, user cannot dislike anymore.
    if (response) {
      if (action === "like" && !userIsFound) {
        onChangeUsersLikesGroup(action, userId);
      } else if (action === "unlike" && userIsFound) {
        onChangeUsersLikesGroup(action, userId);
      }
    }
  };

  const renderLikeDislikeButton = () => {
    const userIsFound = userLikesGroupState.has(parseInt(userId));
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
        <span className="comment-font-mobile">
          {!userIsFound ? " Like" : " Dislike"}
        </span>
      </span>
    );
  };

  const flagService = async (storyId, user_id, action) => {
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

    const userIsFound = userFlagGroupState.has(parseInt(user_id));

    // 1. If users want to flag and that user is not found, user can flag.
    //    Otherwise, user cannot flag anymore.
    // 2. If users want to un-flag and that user is found, user can un-flag.
    //    Otherwise, user cannot un-flag anymore.
    if (response) {
      if (action === "flag" && !userIsFound) {
        onChangeUsersFlagGroup(action, userId);
      } else if (action === "unflag" && userIsFound) {
        onChangeUsersFlagGroup(action, userId);
      }
    }
  };

  const renderFlagButton = () => {
    const userIsFound = userFlagGroupState.has(parseInt(userId));
    const action = !userIsFound ? "flag" : "unflag";

    return (
      <span
        className="flag-button"
        onClick={async () => await flagService(story_id, userId, action)}
      >
        <i
          className={`${!userIsFound ? "far " : "fas "}fa-flag${
            !userIsFound ? "" : " reported"
            }`}
        ></i>{" "}
        <span className="comment-font-mobile">
          {!userIsFound ? " Flag Content" : " Undo Flag"}
        </span>
      </span>
    );
  };

  return (
    <div>
      <div className="like-flag-section">
        <div className="button-group">
          {renderLikeDislikeButton()}
          {renderFlagButton()}
        </div>
      </div>
    </div>
  );
};

export default LikeCommentButtonGroup;
