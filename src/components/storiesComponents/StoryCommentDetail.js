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
  const { role, userId, jwt } = user;

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
          // Authentication: "Bearer " + jwt,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      }
    );

    if (response.status === 200) {
      onChangeDeleteComment(commentId);
    }
  };
  console.log(comment.user_name);
  return (
    <div
      className="comment-detail"
      style={{ padding: "5px 10px", minHeight: "70px", height: "auto" }}
    >
      <div>
        <span
          style={{
            color: "rgb(181, 214, 255)",
            marginRight: "5px",
            fontSize: "17px"
          }}
        >
          <strong>{comment.user_name || comment.user_id} </strong>
        </span>
        <span style={{ color: "white", fontSize: "15px", fontWeight: "300" }}>
          {comment.content}
        </span>
      </div>
      <div
        style={{
          color: "#d6d6d6",
          fontSize: "14px",
          marginTop: "16px",
          marginBottom: "4px"
        }}
      >
        <span style={{ fontWeight: "lighter" }}>16h</span>
        <span
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            cursor: "pointer",
            fontWeight: "bolder"
          }}
        >
          6 likes
        </span>
        {userId === comment.user_id && (
          <button
            onClick={deleteComment}
            style={{
              fontWeight: "bolder",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#d6d6d6",
              fontSize: "14px",
              cursor: "pointer",
              overflow: "hidden",
              backgroundRepeat: "no-repeat"
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryCommentDetail;
