import React, { useEffect } from "react";

import CloseIcon from "../../../images/x.svg";
import "./ListOfChosenFilterValue.css";

const ListOfChosenFilterValue = ({
  filtersChosenArr,
  setShowChosenFilters,
  removeFilterValue,
  section,
}) => {
  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

  useEffect(() => {
    if (!filtersChosenArr.length) {
      setShowChosenFilters(false);
      document.body.style.overflow = "auto";
    }
  }, [filtersChosenArr]);

  const escapeButtonPress = (event) => {
    if (event.keyCode === 27) {
      setShowChosenFilters(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="filter-value-container">
      <div id="filter-entries-wrapper">
        <div id="values-list-header">
          <h2 id="filter-type">{section} Chosen</h2>
          <img
            src={CloseIcon}
            id="close-chosen-filters"
            onClick={() => {
              setShowChosenFilters(false);
              document.body.style.overflow = "auto";
            }}
          />
        </div>
        <div className="sectors-entries">
          {filtersChosenArr.map((sector) => (
            <div className="chosen-sector">
              <p>{sector}</p>
              <img
                src={CloseIcon}
                className="delete-chosen-filter"
                onClick={() => removeFilterValue(sector)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfChosenFilterValue;
