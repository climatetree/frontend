import React, { useState, useEffect } from "react";

import useDebounce from "../../customHooks/useDebounce";
import "./FiltersDropdown.css";

const FiltersDropdown = ({
  allResults,
  filterTerm,
  setTermOnClick,
  status,
}) => {
  const debouncedTerm = useDebounce(filterTerm, 200);
  const [solutionsBasedOnTerm, setSolutionsBasedOnTerm] = useState([]);

  useEffect(() => {
    allResults &&
      setSolutionsBasedOnTerm(
        allResults.filter((option) =>
          option.toLowerCase().includes(debouncedTerm.toLowerCase())
        )
      );
  }, [debouncedTerm]);

  const renderContent = () => {
    if (solutionsBasedOnTerm.length > 0) {
      return (
        <>
          {solutionsBasedOnTerm.map((solution, index) => (
            <div
              className={`filter-entry`}
              key={index}
              onClick={() => setTermOnClick(solution)}
            >
              <span>{solution}</span>
            </div>
          ))}
        </>
      );
    }

    if (!debouncedTerm) {
      return (
        <>
          {allResults &&
            allResults.map((solution, index) => (
              <div
                className={`filter-entry`}
                key={index}
                onClick={() => setTermOnClick(solution)}
              >
                <span>{solution}</span>
              </div>
            ))}
        </>
      );
    }

    return (
      <div className="no-results">
        <span>No {status} is found</span>
      </div>
    );
  };

  const decideClassName = () => {
    return status === "solution" ? "solution" : "sector";
  };

  return (
    <div
      id="selectFromDropdown"
      className={"filter-dropdown-container"}
      id={decideClassName()}
    >
      {renderContent()}
    </div>
  );
};

export default FiltersDropdown;
