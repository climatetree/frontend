import React from "react";

import "./SolutionDropdown.css";

const SolutionDropdown = ({ debouncedFilterTerm }) => {
  return (
    <div id="solution-dropdown-container">
      {debouncedFilterTerm.length === 1 ? (
        <div className="per-entry">
          <span>Still one character</span>
        </div>
      ) : debouncedFilterTerm.length > 1 ? (
        <>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
          <div className="per-entry">
            <span>Good solution !!</span>
          </div>
        </>
      ) : (
        <div id="initial-search">
          <div>
            <div className="no-solution">
              <span>No solution yet</span>
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

export default SolutionDropdown;
