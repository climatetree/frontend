import React, { useEffect } from "react";

import CloseIcon from "../../../images/x.svg";
import "./ListOfChosenFilterValue.css";

const ListOfChosenFilterValue = ({
  sectorsChosenArr,
  setShowChosenSectors,
  removeSectorValue,
}) => {
  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

  useEffect(() => {
    if (!sectorsChosenArr.length) {
      setShowChosenSectors(false);
    }
  }, [sectorsChosenArr]);

  const escapeButtonPress = (event) => {
    if (event.keyCode === 27) {
      setShowChosenSectors(false);
    }
  };

  return (
    <div className="filter-value-container">
      <div id="filter-entries-wrapper">
        <div id="values-list-header">
          <h2 id="filter-type">Sectors Chosen</h2>
          <img
            src={CloseIcon}
            id="close-chosen-filters"
            onClick={() => setShowChosenSectors(false)}
          />
        </div>
        <div className="sectors-entries">
          {sectorsChosenArr.map((sector) => (
            <div className="chosen-sector">
              <p>{sector}</p>
              <img
                src={CloseIcon}
                className="delete-chosen-filter"
                onClick={() => removeSectorValue(sector)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfChosenFilterValue;
