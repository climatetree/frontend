import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import moreIcon from '../../images/more-horizontal.svg';
import deleteIcon from '../../images/trash.svg';
import closeIcon from '../../images/x.svg';
import editIcon from '../../images/edit-3.svg';
import './StoryPreview.css';
import EditStoryForm from "../loginComponents/EditStoryForm";

export default function StoryPreview({
  story,
  index,
  updateStories,
  removeStory,
  cssScope,
}) {
  const [openEditForm, setOpenEditForm] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (cssScope) {
      (async () => {
        require(`./StoryPreview.${cssScope}.css`);
      })();
    }
  }, []);
  function openOperations(event) {
    event.preventDefault();
    event.target.parentNode.parentNode.parentNode.classList.add('open');
  }
  function closeOperations(event) {
    event.target.parentNode.parentNode.parentNode.classList.remove('open');
  }
  function handleDelete(story_id, jwt) {
    const confirmed = confirm(
      "This action cannot be undone.\nProceed with delete story?"
    );
    if (!confirmed) {
      return;
    }
    fetch(
      `https://climatetree-api-gateway.azurewebsites.net/stories/delete/${story_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then(() => {
      removeStory();
    })
    .catch(error => {
      console.log(error);
    });
  }
  return (
    <>
      <a
        className={`story-wrapper ${cssScope}-story-wrapper`}
        href={story.hyperlink}
        target="_blank"
      >
        <div className="story-image">
          <img src={story.image} alt={story.story_title} />
          <div className="story-rating" title="ClimateTree quality rating">
            {story.rating === 0 ? (
              <p>Unrated</p>
            ) : (
              <p>Rating: {story.rating}</p>
            )}
          </div>
        </div>
        <div className="story-detail">
          <header>
            {story.strategy && story.strategy.length > 0 && (
              <span title={`Strategy: ${story.strategy.join('|')}`}>
                {story.strategy.join('|')}
              </span>
            )}
            {story.sector && story.sector.length > 0 && (
              <span title={`Sector: ${story.sector.join('|')}`}>
                {story.sector.join('|')}
              </span>
            )}
            {story.media_type && (
              <span title="media type">{story.media_type}</span>
            )}
            {(user.role <= 2 || story.user_id === user.userId) && (
              <img
                src={moreIcon}
                alt="more"
                className="story-more"
                onClick={(event) => {
                  openOperations(event);
                }}
              />
            )}
          </header>
          <article>
            <p className="story-title">{story.story_title}</p>
            <p className="story-description">{story.description}</p>
            <p className="story-hyperlink">{story.hyperlink}</p>
          </article>
          <footer>
            <p className="story-post-info">Posted by {story.posted_by} - {new Date(story.date).toDateString()}</p>
          </footer>
        </div>
        {(user.role <= 2 || story.user_id === user.userId) && (
          <div
            className="operations-overlay"
            onClick={(event) => { event.preventDefault(); }}
          >
            <div
              className="story-operation"
              onClick={() => setOpenEditForm(true)}
            >
              <img src={editIcon} alt="edit" />
              <p>Edit Story</p>
            </div>
            <div
              className="story-operation"
              onClick={() => handleDelete(story.story_id, user.jwt)}
            >
              <img src={deleteIcon} alt="delete story" />
              <p>Delete Story</p>
            </div>
            <div
              className="story-operation" 
              onClick={closeOperations}
            >
              <img src={closeIcon} alt="cancel" />
              <p>Cancel</p>
            </div>
          </div>
        )}
      </a>
      {(user.role <= 2 || story.user_id === user.userId) && 
        openEditForm && (
        <EditStoryForm
          story={story}
          toggleForm={setOpenEditForm}
          index={index}
          updateStories={updateStories}
        />
      )}
    </>
  );
}