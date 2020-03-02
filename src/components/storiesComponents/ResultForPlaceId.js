import React from "react";

const ResultForPlaceId = ({ placeId, placeName }) => {
  return (
    <div className="result-term">
      Results based on place id:{" "}
      <span id="search-term">
        {placeName} ({placeId})
      </span>
    </div>
  );
};

export default ResultForPlaceId;
