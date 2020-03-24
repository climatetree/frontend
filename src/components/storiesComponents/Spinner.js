import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <div
        className="loading-text"
        style={{ color: "#fff", display: "block", marginTop: "20px" }}
      >
        Loading stories
      </div>
    </div>
  );
};

export default Spinner;
