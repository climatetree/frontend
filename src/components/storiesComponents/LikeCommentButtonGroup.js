import React, { useContext } from "react";
import axios from "axios";

import StoryCommentInput from "./StoryCommentInput";
import authContext from "../context/authContext";

const LikeCommentButtonGroup = ({ onToggleComment, toggleComment, story }) => {
  const [{ username, userid }] = useContext(authContext);
  const { story_id, liked_by_users } = story;

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
  };

  const renderLikeDislikeButton = () => {
    const userIsFound = liked_by_users.find(user => user.toString() === userid);
    const action = !userIsFound ? "like" : "unlike";

    return (
      <span
        className="like-button"
        onClick={async () => await likeService(story_id, userid, action)}
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
          {/* <span
            className="like-button"
            onClick={async () => await likeService(story_id, userid)}
          >
            <i className="far fa-heart"></i>{" "}
            <span className="like-comment-font-mobile">
              {renderLikeDislikeButton()}
            </span>
          </span> */}

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
