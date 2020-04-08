import React, { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../context/UserContext";

const StoryCommentInput = ({
  // toggleComment,
  // toggleViewComment,
  story,
  onChangeAddComment,
  openViewComment
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
      date: Date.now()
    };

    // send new comment to back end
    if (newComment.content) {
      const response = await axios.post(
        "https://climatetree-api-gateway.azurewebsites.net/stories/story/comment",
        newComment,
        options
      );

      console.log(response);

      onChangeAddComment(response.data);
      openViewComment();
      setCommentContent("");
    }
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
        onChange={e => onChangeCommentContent(e)}
        placeholder="Enter a new comment..."
        value={content}
      />
    </form>
  );
};

export default StoryCommentInput;
