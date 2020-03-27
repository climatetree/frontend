import React from "react";

const StoryCommentInput = ({ toggleComment }) => {
  return (
    <div
      className={`comment-input-container ${
        !toggleComment ? "" : "active-comment-input-container"
      }`}
    >
      <input
        type="text"
        className={`comment-input ${
          !toggleComment ? "" : "active-comment-input"
        }`}
        placeholder="Enter a new comment..."
      />
    </div>
  );
};

export default StoryCommentInput;
