import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

const StoryCommentDetail = ({
  comment,
  storyId,
  commentId,
  onChangeDeleteComment
}) => {
  const { user } = useContext(UserContext);
  const { role, userId, jwt } = user;

  const deleteComment = async () => {
    const comment = {
      storyId,
      userId,
      role,
      commentId
    };

    const response = await fetch(
      "https://climatetree-api-gateway.azurewebsites.net/stories/story/comment",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }
    );

    if (response.status === 200) {
      onChangeDeleteComment(commentId);
    }
  };

  return (
    <div className="comment-detail">
      <div>
        <span className="user-name">
          <strong>{comment.user_name} </strong>
        </span>
        <span className="comment-content">{comment.content}</span>
      </div>
      <div className="comment-footer">
        <span className="comment-hours-ago">16h</span>
        <span className="comment-likes-count">6 likes</span>
        {userId === comment.user_id && (
          <button onClick={deleteComment} className="delete-comment-btn">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryCommentDetail;
