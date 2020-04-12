import React from "react";

import "./ListOfChosenFilterValue.css";

const ListOfChosenFilterValue = ({ sectorsChosenArr }) => {
  return (
    <div className="filter-value-container">
      <div id="filter-entries-wrapper">
        {sectorsChosenArr.map((sector) => (
          <p className="chosen-sector">{sector} </p>
        ))}
      </div>
    </div>
  );
};

export default ListOfChosenFilterValue;
