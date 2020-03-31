import React, { useContext } from "react";
// import axios from "axios";

import { UserContext } from "../context/UserContext";

const StoryCommentDetail = ({
  comment,
  storyId,
  commentId,
  onChangeDeleteComment
}) => {
  const { user } = useContext(UserContext);
  const { role, userId } = user;

  const deleteComment = async () => {
    const comment = {
      storyId,
      userId,
      role,
      commentId
    };

    const response = await fetch(
      "http://localhost:3000/stories/story/comment",
      {
        method: "DELETE",
        headers: {
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
      <h4 style={{ color: "white" }}>{comment.user_id}</h4>
      <div style={{ color: "white", color: "#ddd", fontSize: "13px" }}>
        {comment.content}
        {userId === comment.user_id && (
          <button onClick={deleteComment} style={{ marginLeft: "15px" }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryCommentDetail;
