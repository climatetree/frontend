import React, { useState } from "react";
import { ReactTinyLink } from "react-tiny-link";

import StoryCommentInput from "./StoryCommentInput";

const StoryDetail = ({ story }) => {
  let [toggleComment, setToggleComment] = useState(false);

  const onToggleComment = () => {
    setToggleComment(prevToggleCommentState => !prevToggleCommentState);
  };

  return (
    <div className="story-card">
      <div className="heading-card-section">
        <a
          href={story.hyperlink}
          target="_blank"
          rel="noopener noreferrer"
          className="title-hyperlink"
        >
          <h3>{story.story_title}</h3>
        </a>

        <div className="link-preview-container">
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={3}
            minLine={1}
            url={story.hyperlink}
          />
        </div>

        <div className="created-detail">
          Created:{" "}
          {`${story.date.getUTCMonth() +
            1}/${story.date.getUTCDate()}/${story.date.getUTCFullYear()}`}
        </div>
        <div className="liked-count">
          <i className="fa fa-heart"></i> {story.rating} Likes
        </div>
      </div>

      <div className="like-comment-section">
        <div className="button-group">
          <span className="like-comment-button">
            <i className="far fa-heart fa-2x"></i>
          </span>

          <span
            className="like-comment-button"
            onClick={() => onToggleComment()}
          >
            <i className="far fa-comment fa-2x"></i>
          </span>
        </div>
      </div>
      <StoryCommentInput toggleComment={toggleComment} />
    </div>
  );
};

export default StoryDetail;
