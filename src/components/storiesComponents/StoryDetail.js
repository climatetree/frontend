import React from "react";
// import "../styles/Stories.css";

const StoryDetail = ({ story }) => {
  return (
    <div className="story-card">
      <div className="heading-card-section">
        <a
          href={story.hyperlink}
          target="_blank"
          rel="noopener noreferrer"
          className="title-hyperlink"
        >
          <h3>{story.title}</h3>
        </a>
        <div className="created-detail">
          Created:{" "}
          {`${story.date.getUTCMonth() +
            1}/${story.date.getUTCDate()}/${story.date.getUTCFullYear()}`}
        </div>
      </div>

      <div className="like-comment-section">
        <div className="button-group">
          <span className="like-comment-button">
            <i class="far fa-heart fa-2x"></i>
          </span>

          <span className="like-comment-button">
            <i class="far fa-comment fa-2x"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
