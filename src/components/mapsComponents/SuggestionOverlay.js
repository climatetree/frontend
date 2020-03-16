import React from 'react';
import closeIcon from '../../images/x.svg';
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
        <img
          className="close-btn"
          src={closeIcon}
          alt="close suggestion"
          onClick={closeConfirmationPanel}
        />
        <p className="confirmation-title">Did you mean</p>
        {placeSuggestions.map(({ properties }, index) => {
          const { place_id, name, state_name, nation_name } = properties;
          return (
            <div
              className="confirmation-item"
              key={place_id}
              onClick={() => {
                handleSuggestionClick(place_id, name, index);
                closeConfirmationPanel();
              }}
            >
              <p>{name}</p>
              <p className="state-nation-name-dropdown">
                {state_name} {state_name ? "," : ""} {nation_name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};