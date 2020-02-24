import React from "react";

const StoryCommentInput = () => {
  return (
    <div className="comment-input-container">
      <input
        type="text"
        className="post-comment-input"
        placeholder="Enter a new comment..."
      />
    </div>
  );
};

export default StoryCommentInput;
