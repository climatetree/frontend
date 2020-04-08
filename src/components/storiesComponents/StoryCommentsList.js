
import React, { useState } from "react";
import StoryCommentDetail from "./StoryCommentDetail";

const StoryCommentsList = ({ comments, storyId, onChangeDeleteComment }) => {
  return (
    <div className="comments-list">
      {comments.map(comment => (
        <StoryCommentDetail
          key={comment.comment_id}
          comment={comment}
          storyId={storyId}
          commentId={comment.comment_id}
          onChangeDeleteComment={onChangeDeleteComment}
        />
      ))}
    </div>
  );
};

export default StoryCommentsList;
