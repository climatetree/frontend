/**
 * Comment components:
 * storyId (the story to comment)
 * userId (the user who wrote the comment)
 * likes-count (numbers of likes on that given comment)
 * additional option regarding the type of user -> delete comment
 * 
 */
import React, { useContext, useState, useEffect } from "react";

import { UserContext } from "../context/UserContext";
import {
  doesConvertToYear,
  doesConvertToMonth,
  doesConvertToDay,
  doesConvertToHour,
  doesConvertToMinutes
} from "./helper/timeConversion";

const StoryCommentDetail = ({
  comment,
  storyId,
  commentId,
  onChangeDeleteComment
}) => {
  useEffect(() => {
    (() => {
      onChangeTimeSince();
    })();
  }, []);

  const { user } = useContext(UserContext);
  const { role, userId, jwt } = user;

  const [timeSince, setTimeSince] = useState(0);
  const [timeSinceAlphabet, setTimeSinceAlphabet] = useState("s");

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

  const onChangeTimeSince = () => {
    const seconds = Math.floor((Date.now() - new Date(comment.date)) / 1000);

    if (doesConvertToYear(seconds)) {
      setTimeSince(Math.floor(seconds / 31536000));
      setTimeSinceAlphabet("y");
    } else if (doesConvertToMonth(seconds)) {
      setTimeSince(Math.floor(seconds / 2592000));
      setTimeSinceAlphabet("m");
    } else if (doesConvertToDay(seconds)) {
      setTimeSince(Math.floor(seconds / 86400));
      setTimeSinceAlphabet("d");
    } else if (doesConvertToHour(seconds)) {
      setTimeSince(Math.floor(seconds / 3600));
      setTimeSinceAlphabet("h");
    } else if (doesConvertToMinutes(seconds)) {
      setTimeSince(Math.floor(seconds / 60));
      setTimeSinceAlphabet("m");
    } else {
      setTimeSince(seconds);
      setTimeSinceAlphabet("s");
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
        <span className="comment-hours-ago">
          {timeSince + timeSinceAlphabet}
        </span>
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
