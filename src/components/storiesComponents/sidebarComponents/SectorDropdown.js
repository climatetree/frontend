import React from "react";

import "./SectorDropdown.css";

const SectorDropdown = ({ debouncedFilterTerm }) => {
  return (
    <div id="sector-dropdown-container">
      {debouncedFilterTerm.length === 1 ? (
        <div className="per-entry">
          <span>Still one character</span>
        </div>
      ) : debouncedFilterTerm.length > 1 ? (
        <>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
          <div className="per-entry">
            <span>Good sector !!</span>
          </div>
        </>
      ) : (
        <div id="initial-search">
          <div>
            <div className="no-solution">
              <span>No sector yet</span>
            </div>
            <div>
              <span className="enter-input-msg">Input one</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorDropdown;
