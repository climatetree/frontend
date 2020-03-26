import React, { useState } from "react";
import { ReactTinyLink } from "react-tiny-link";
import Can from "../loginComponents/Can";
import StoryCommentInput from "./StoryCommentInput";

const StoryDetail = ({ story }) => {
  let [toggleComment, setToggleComment] = useState(false);

  const onToggleComment = () => {
    setToggleComment(prevToggleCommentState => !prevToggleCommentState);
  };
  const [role] = window.localStorage.getItem("userRole");
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

        <div>
          <div className="created-detail">
            Created:{" "}
            {`${story.date.getUTCMonth() +
              1}/${story.date.getUTCDate()}/${story.date.getUTCFullYear()}`}
          </div>
          <div className="liked-count">
            <i className="fa fa-heart"></i> {story.liked_by_users.length} Likes
          </div>
        </div>
      </div>

      <hr></hr>
      <Can
        role={role}
        perform="posts:like"
        yes={() => (
          <div>
            <div className="like-comment-section">
              <div className="button-group">
                <span className="like-button">
                  <i className="far fa-heart"></i>{" "}
                  <span className="like-comment-font-mobile">
                    Give it a Heart
                  </span>
                </span>

                <span
                  className="comment-button"
                  onClick={() => onToggleComment()}
                >
                  <i className="far fa-comment"></i>{" "}
                  <span className="like-comment-font-mobile">Post Comment</span>
                </span>
              </div>
            </div>
            <StoryCommentInput toggleComment={toggleComment} />
          </div>
        )}
      />
    </div>
  );
};

export default StoryDetail;
