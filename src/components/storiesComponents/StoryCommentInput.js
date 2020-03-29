import React, { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../context/UserContext";

const StoryCommentInput = ({ toggleComment, story }) => {
  const [content, setCommentContent] = useState("");

  const { user } = useContext(UserContext);
  const { userId, jwt } = user;
  const { story_id } = story;

  const onChangeCommentContent = e => {
    setCommentContent(e.target.value);
  };

  const onSubmitComment = async e => {
    e.preventDefault();
    const options = {
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json"
      }
    };

    const newComment = {
      storyId: story_id,
      userId,
      content,
      date: "2011-05-26T07:56:00.123Z"
    };

    const response = await axios.post(
      "http://localhost:3000/stories/story/comment",
      newComment
    );

    console.log(response);
    setCommentContent("");
  };

  return (
    <form
      className={`comment-input-container ${
        !toggleComment ? "" : "active-comment-input-container"
      }`}
      onSubmit={e => onSubmitComment(e)}
    >
      <input
        type="text"
        className={`comment-input ${
          !toggleComment ? "" : "active-comment-input"
        }`}
        onChange={e => onChangeCommentContent(e)}
        placeholder="Enter a new comment..."
        value={content}
      />
    </form>
  );
};

export default StoryCommentInput;
