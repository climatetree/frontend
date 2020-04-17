import React, { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import CloseIcon from "../../images/x.svg";
import AlertIcon from "../../images/alert-triangle.svg";
import RadioGroup from '../generalComponents/RadioGroup';
import Select from '../generalComponents/Select';
import useStoryForm from './useStoryForm';
import "./EditStoryForm.css";

export default function EditStoryForm({
  story,
  toggleForm,
  updateStories,
}) {
  const { user } = useContext(UserContext);
  const {
    submitStatus, setSubmitStatus,
    errorMsg, setErroMsg,
    strategy,
    sector, allSectors,
    solution, allSolutions,
    mediaType, setMediaType, allMediaTypes,
    handleStrategySelection,
    handleSectorSelection,
    handleSolutionSelection,
  } = useStoryForm({
    strategy: story.strategy[0],
    sector: story.sector[0],
    solution: story.solution[0],
    mediaType: story.media_type,
  });
  const handleUpdate = async () => {
    setSubmitStatus('submitting');
    if (submitStatus !== 'idle') {
      return;
    }
    const updatedStory = {
      ...story,
      media_type: mediaType,
      strategy: [strategy === "" ? "Other" : strategy],
      sector: [sector === "" ? "Other" : sector],
      solution: [solution === "" ? "Other" : solution],
    };
    fetch(
      // `https://climatetree-api-gateway.azurewebsites.net/stories/update/${story.story_id}`,
      `https://backend-mongo-stories.azurewebsites.net/v1/stories/update/${story.story_id}`,
      {
      method: "PUT",
      headers: {
        // Authorization: `Bearer ${user.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStory),
    })
    .then(() => {
      updateStories(updatedStory);
      toggleForm(false);
      setSubmitStatus('idle');
    })
    .catch((error) => {
      setErroMsg(error.toString());
      console.log(error);
    });
  }
  return (
    <section
      className="story-form-wrapper"
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <form autoComplete="off">
        <header>
          <p className="">Edit Story</p>
          <div className="close-btn">
            <img
              src={CloseIcon}
              alt="close"
              onClick={() => toggleForm(false)}
            />
          </div>
        </header>
        {errorMsg && (
          <div className='error'>
            <img src={AlertIcon} alt="Alert" />{errorMsg}
          </div>
        )}
        <div className="form-body">
          <label>Title</label>
          <p className="story-title">{story.story_title}</p>
          <Select
            name="media-type"
            label="Media Type"
            placeholder="Select Sector"
            value={mediaType}
            onChange={setMediaType}
            options={allMediaTypes}
            direction="below"
          />
          <label htmlFor="strategy">
            Strategy
            <small className="optional-label"> - Optional</small>
          </label>
          <div className="strategy-radio-group">
            <RadioGroup
              radio={["Mitigation", "Adaptation"]}
              name="strategy"
              selectRadioOption={strategy}
              onChange={handleStrategySelection}
              filled
            />
          </div>
          <Select
            name="sector"
            label="Sector"
            placeholder="Select Sector"
            value={sector}
            onChange={handleSectorSelection}
            options={[...allSectors, "Other"]}
            optional={true}
          />
          <Select
            name="solution"
            label="solution"
            placeholder="Select Solution"
            value={solution}
            onChange={handleSolutionSelection}
            options={[...allSolutions, "Other"]}
            optional={true}
          />
        </div>
        <footer>
          <button
            className="post-story"
            type="button"
            onClick={handleUpdate}
          >
            {submitStatus === 'idle' ? 'Update' : 'Update...'}
          </button>
        </footer>
      </form>
    </section>
  );
}