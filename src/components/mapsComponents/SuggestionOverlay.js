import React from 'react';
import closeIcon from '../../images/x.dark.svg';
import './SuggestionOverlay.css';

export default function SuggestionOverlay({
  placeSuggestions,
  handleSuggestionClick,
}) {
  const closeConfirmationPanel = () => {
    document.getElementById('confirmation').style.display = 'none';
  };
  return (
    <div id="confirmation">
      <div id="confirmation-panel">
        <header>
          <p className="confirmation-title">Did you mean</p>
          <img
            className="close-btn"
            src={closeIcon}
            alt="close suggestion"
            onClick={closeConfirmationPanel}
          />
        </header>
        <div className="suggestion-list">
          {placeSuggestions.map(({ properties }, index) => {
            const { place_id, name, state_name, nation_name, type } = properties;
            return (
              <div
                className="confirmation-item"
                key={place_id}
                onClick={() => {
                  handleSuggestionClick(place_id, name, index);
                  closeConfirmationPanel();
                }}
              >
                <p>{name} - <small>{type}</small></p>
                <p className="state-nation-name-dropdown">
                  {(type === "NATION" || type === "STATE") ? "" : state_name}
                  {(type === "NATION" || type === "STATE") ? "" : ', '}
                  {type === "NATION" ? "Earth" : nation_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}