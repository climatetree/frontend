import React, { useState, useEffect } from "react";

import useDebounce from "../../customHooks/useDebounce";
import "./FiltersDropdown.css";

const FiltersDropdown = ({
  allResults,
  filterTerm,
  setTermOnClick,
  status,
  strategyTerm,
  loadingFilter,
}) => {
  const debouncedTerm = useDebounce(filterTerm, 200);
  const [filtersBasedOnTerm, setFiltersBasedOnTerm] = useState([]);

  useEffect(() => {
    setFiltersBasedOnTerm([]);
  }, []);

  useEffect(() => {
    setFiltersBasedOnTerm([]);
  }, [strategyTerm]);

  useEffect(() => {
    setFiltersBasedOnTerm([]);
  }, [filterTerm]);

  useEffect(() => {
    if (filterTerm) {
      allResults &&
        setFiltersBasedOnTerm(
          allResults.filter((option) =>
            option.toLowerCase().includes(debouncedTerm.toLowerCase())
          )
        );
    }
  }, [debouncedTerm]);

  const onFilterClick = (term) => {
    setTermOnClick(term);
  };

  const renderContent = () => {
    if (!loadingFilter) {
      if (filtersBasedOnTerm.length > 0) {
        return (
          <>
            {filtersBasedOnTerm.map((filterValue, index) => (
              <div
                className={`filter-entry`}
                key={index}
                onClick={() => onFilterClick(filterValue)}
              >
                <span>{filterValue}</span>
              </div>
            ))}
          </>
        );
      }

      if (!debouncedTerm) {
        return (
          <>
            {allResults &&
              allResults.map((filterValue, index) => (
                <div
                  className={`filter-entry`}
                  key={index}
                  onClick={() => onFilterClick(filterValue)}
                >
                  <span>{filterValue}</span>
                </div>
              ))}
          </>
        );
      }
    }

    if (loadingFilter) {
      return (
        <div className="filter-entry">
          <span>Loading...</span>
        </div>
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
    <>
      <div
        id="selectFromDropdown"
        className={"filter-dropdown-container"}
        id={decideClassName()}
      >
        {renderContent()}
      </div>
    </>
  );
};

export default FiltersDropdown;
