import React from "react";

import StoryCommentInput from "./StoryCommentInput";

const LikeCommentButtonGroup = ({ onToggleComment, toggleComment }) => {
  return (
    <div>
      <div className="like-comment-section">
        <div className="button-group">
          <span className="like-button">
            <i className="far fa-heart"></i>{" "}
            <span className="like-comment-font-mobile">Give it a Heart</span>
          </span>

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
