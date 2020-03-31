import React, { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../context/UserContext";

const StoryCommentInput = ({
  // toggleComment,
  // toggleViewComment,
  story,
  onChangeAddComment
  // comments
}) => {
  const [content, setCommentContent] = useState("");

  const { user } = useContext(UserContext);
  const { userId, jwt, username } = user;
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
      username,
      content,
      date: "2011-05-26T07:56:00.123Z"
    };

    const response = await axios.post(
      "https://climatetree-api-gateway.azurewebsites.net/stories/story/comment",
      newComment,
      options
    );

    // const lastCommentIndex = response.data.comments.length - 1;
    console.log(response);

    onChangeAddComment(response.data);
    setCommentContent("");
  };

  return (
    <form
      // className={`comment-input-container ${
      //   !toggleComment ? "" : "active-comment-input-container"
      // }`}
      className="comment-input-container active-comment-input-container"
      id={story_id}
      onSubmit={e => onSubmitComment(e)}
    >
      <input
        type="text"
        // className={`comment-input ${
        //   !toggleComment ? "" : "active-comment-input"
        // }`}
        className="comment-input active-comment-input"
        style={{ backgroundColor: "#e0e0e0" }}
        onChange={e => onChangeCommentContent(e)}
        placeholder="Enter a new comment..."
        value={content}
      />
    </form>
  );
};

export default StoryCommentInput;
