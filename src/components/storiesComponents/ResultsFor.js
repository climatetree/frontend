import React from "react";

const ResultsFor = ({ searchTerm }) => {
  return (
    <div className="result-term">
      Results for: <span id="search-term">{searchTerm}</span>
    </div>
  );
};

export default ResultsFor;
