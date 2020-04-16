/**
 * A story has the following properties:
 * - Author (user_id)
 * - Title
 * - Date
 * - Location (place_id)
 * - HYperlink
*/
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../context/UserContext";
import useDebounce from "../customHooks/useDebounce";
import CloseIcon from "../../images/x.svg";
import AlertIcon from "../../images/alert-triangle.svg";
import RadioGroup from '../generalComponents/RadioGroup';
import Select from '../generalComponents/Select';
import useStoryForm from './useStoryForm';
import "./PostStoryForm.css";

export default function PostStoryForm({
  setOpenPostStoryForm,
  myStories,
  setMyStories,
}) {
  const { user } = useContext(UserContext);
  const closeForm = () => {
    setOpenPostStoryForm(false);
  };
  const [hyperlink, setHyperlink] = useState("");
  const [place, setPlace] = useState("");
  const debouncedSearchTerm = useDebounce(place, 1000);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [selectedPlaceID, setSelectedPlaceID] = useState(null);
  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 1) {
      setIsSearchingSuggestions(true);
      fetch(
        `https://climatetree-api-gateway.azurewebsites.net/places/${debouncedSearchTerm}`
      )
        .then((response) => response.json())
        .then((results) => {
          if (results.features) {
            setPlaceSuggestions(results.features);
            setSelectedPlaceID(results.features[0].properties.place_id);
          } else {
            setPlaceSuggestions([]);
            setSelectedPlaceID(null);
          }
          setIsSearchingSuggestions(false);
        });
    } else {
      setPlaceSuggestions([]);
      setSelectedPlaceID(null);
    }
  }, [debouncedSearchTerm]);
  async function handleSubmit(hyperlink, preview, place_id) {
    // the new story is stored on the backend-mongo-stories db
    fetch("https://climatetree-api-gateway.azurewebsites.net/stories/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.jwt}`,
        "Content-Type": "application/json",
      },
      // convert the data to json
      body: JSON.stringify({
        user_id: user.userId,
        posted_by: user.username,
        hyperlink,
        story_title: preview.title || hyperlink,
        description: preview.description || hyperlink,
        image: preview.image || "",
        place_ids: [place_id],
        date: Date().toString(),
        media_type: mediaType,
        strategy: strategy ? [strategy] : ["Other"],
        sector: sector.length ? [sector] : ["Other"],
        solution: solution.length ? [solution] : ["Other"],
      }),
    })
    .then(response => response.json())
    .then(story => {
      // Add that new story to the user profile
      setMyStories([
        ...myStories,
        {
          ...story,
          image: preview.image || "",
        },
      ]);
      closeForm();
      setSubmitStatus('idle');
    })
    .catch((error) => {
      setErroMsg(error.toString());
      console.log(error);
    });
  }
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
  } = useStoryForm();
  return (
    <section className="story-form-wrapper">
      <form autoComplete="off">
        <header>
          <p className="">Post New Story</p>
          <div className="close-btn">
            <img
              src={CloseIcon}
              alt="close"
              onClick={closeForm}
            />
          </div>
        </header>
        {errorMsg && (
          <div className='error'>
            <img src={AlertIcon} alt="Alert" />{errorMsg}
          </div>
        )}
        <div className="form-body">
          <label htmlFor="hyperlink">Link</label>
          <input
            id="hyperlink"
            name="hyperlink"
            type="text"
            value={hyperlink}
            onChange={(event) => {
              setHyperlink(event.target.value);
            }}
            placeholder="Story Hyperlink"
          />
          <div className="dropdown-input">
            <label htmlFor="place">Place</label>
            <input
              id="place"
              name="place"
              type="text"
              placeholder="Story Place"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
              onFocus={() => {
                document.querySelector("#place-suggestions").style.display = "block";
              }}
              onBlur={() => {
                setTimeout(() => {
                  const suggestions = document.querySelector("#place-suggestions");
                  if (suggestions) {
                    suggestions.style.display = "none";
                  }
                }, 200);
              }}
            />
            <div id="place-suggestions">
              {isSearchingSuggestions ? (
                <p className="hint">Searching...</p>
              ) : placeSuggestions.length > 0 ? (
                <>
                  {placeSuggestions.map(({ properties }) => {
                    const {
                      place_id,
                      name,
                      state_name,
                      nation_name,
                    } = properties;
                    return (
                      <p
                        className={`place-name-dropdown${
                          place_id === selectedPlaceID[0] ? " highlight" : ""
                        }`}
                        key={place_id}
                        onClick={() => {
                          setPlace(name);
                          setSelectedPlaceID(place_id);
                        }}
                      >
                        {name}
                        <span className="state-nation-name-dropdown">
                          {state_name} {state_name ? "," : ""} {nation_name}
                        </span>
                      </p>
                    );
                  })}
                </>
              ) : debouncedSearchTerm.length === 1 ? (
                <p className="hint">Please enter more than 1 letter</p>
              ) : debouncedSearchTerm.length > 0 ? (
                <p className="hint">No suggestion</p>
              ) : (
                <p className="hint">Place Suggestions</p>
              )}
            </div>
          </div>
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
            label="Solution"
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
            onClick={async () => {
              setSubmitStatus('submitting');
              if (submitStatus !== 'idle') {
                return;
              }
              try {
                const url = new URL(hyperlink);
                if (selectedPlaceID) {
                  const response = await fetch(
                    `https://climatetree-api-gateway.azurewebsites.net/stories/getPreview?hyperlink=${encodeURIComponent(
                      hyperlink
                    )}`
                  );
                  const preview = await response.json();
                  handleSubmit(hyperlink, preview, selectedPlaceID);
                } else {
                  setErroMsg('Please select a place');
                  setSubmitStatus('idle');
                }
              } catch (error) {
                setErroMsg('Please enter a valid hyperlink');
                setSubmitStatus('idle');
              }
            }}
          >
            {submitStatus === 'idle' ? 'Post' : 'Posting...'}
          </button>
        </footer>
      </form>
    </section>
  );
}