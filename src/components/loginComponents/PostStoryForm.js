import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../context/UserContext";
import useDebounce from '../mapsComponents/helpers/useDebounce';
import Checkbox from '../mapsComponents/Checkbox';
import DropdownInput from './DropdownInput';
import CloseIcon from '../../images/x.svg';
import './PostStoryForm.css';

export default function PostStoryForm({
  setOpenPostStoryForm,
  myStories,
  setMyStories,
}) {
  const { user } = useContext(UserContext);
  const closeForm = () => {
    setOpenPostStoryForm(false)
  }
  async function handleSubmit(hyperlink, preview, place_id) {
    fetch(
      'https://climatetree-api-gateway.azurewebsites.net/stories/create',
      {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + user.jwt,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.userId,
          posted_by: user.username,
          hyperlink,
          story_title: preview.title || hyperlink,
          description: preview.description || hyperlink,
          image: preview.image || '',
          place_ids: [place_id],
          date: Date().toString(),
          strategy: strategies.length ? strategies : ['Other'],
          sector: sector.length ? [sector] : ['Other'],
          solution: solution.length ? [solution] : ['Other'],
        }),
      }
    ).then(() => {
      setMyStories([
        ...myStories,
        {
          user_id: user.userId,
          posted_by: user.username,
          hyperlink,
          story_title: preview.title || hyperlink,
          description: preview.description || hyperlink,
          image: preview.image || '',
          place_ids: [place_id],
          date: Date().toString(),
          strategy: strategies.length ? strategies : ['Other'],
          sector: sector.length ? [sector] : ['Other'],
          solution: solution.length ? [solution] : ['Other'],
        }
      ]);
    }).catch((error) => {
      console.log(error);
    });
    closeForm();
  }
  const [strategies, setStrategies] = useState([]);
  const toggleStrategy = (strategyName) => {
    if (strategies.includes(strategyName)) {
      setStrategies(strategies.filter(s => s !== strategyName));
    } else {
      setStrategies([...strategies, strategyName]);
    }
  }
  const [sector, setSector] = useState('');
  const [allSectors, setAllSectors] = useState([]);
  const [solution, setSolution] = useState('');
  const [allSolutions, setAllSolutions] = useState([]);
  useEffect(() => {
    (async () => {
      // const response = await fetch('https://climatetree-api-gateway.azurewebsites.net/stories/all/solution');
      const solutionResponse = await fetch('https://backend-mongo-stories.azurewebsites.net/stories/all/solution');
      const solutions = await solutionResponse.json();
      setAllSolutions(solutions);
      const sectorResponse = await fetch('https://backend-mongo-stories.azurewebsites.net/stories/all/sector');
      const sectors = await sectorResponse.json();
      setAllSectors(sectors);
    })();
  }, []);
  const [hyperlink, setHyperlink] = useState('');
  const [place, setPlace] = useState('');
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
        .then(response => response.json())
        .then(results => {
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
  return (
    <section className="story-form-wrapper">
      <form autoComplete="off">
        <header>
          <p className="">Post New Story</p>
          <div className="close-btn">
            <img
              src={CloseIcon}
              alt="close post story form"
              onClick={closeForm}
            />
          </div>
        </header>
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
                    const { place_id, name, state_name, nation_name } = properties;
                    return (
                      <p
                        className={`place-name-dropdown${place_id === selectedPlaceID[0] ? ' highlight' : ''}`}
                        key={place_id}
                        onClick={() => {
                          setPlace(name);
                          setSelectedPlaceID(place_id);
                        }}
                      >
                        {name}
                        <span className="state-nation-name-dropdown">
                          {state_name} {state_name ? ',' : ''} {nation_name}
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
          <label htmlFor="strategy">
            Strategy
            <small className="optional-label"> - Optional</small>
          </label>
          <div className="strategy-checkbox-group">
            <Checkbox
              key="Mitigation"
              label="Mitigation"
              checked={strategies.includes('Mitigation')}
              onChange={() => toggleStrategy('Mitigation')}
            />
            <Checkbox
              key="Adaptation"
              label="Adaptation"
              checked={strategies.includes('Adaptation')}
              onChange={() => toggleStrategy('Adaptation')}
            />
          </div>
          <DropdownInput
            name="sector"
            type="text"
            placeholder="Story Sector"
            label="Sector"
            allOptions={allSectors}
            searchTerm={sector}
            setSearchTerm={setSector}
          />
          <DropdownInput
            name="solution"
            type="text"
            placeholder="Story Solution"
            label="Solution"
            allOptions={allSolutions}
            searchTerm={solution}
            setSearchTerm={setSolution}
          />
        </div>
        <footer>
          <button
            className="post-story"
            type="button"
            onClick={async () => {
              if (selectedPlaceID) {
                const response = await fetch(`https://backend-mongo-stories.azurewebsites.net/stories/getPreview?hyperlink=${encodeURIComponent(hyperlink)}`);
                const preview = await response.json();
                handleSubmit(hyperlink, preview, selectedPlaceID);
              }
            }}
          >Post</button>
        </footer>
      </form>
    </section>
  );
}