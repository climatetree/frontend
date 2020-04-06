import React, { useState, useEffect } from "react";
import axios from "axios";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import useDebounceFilter from "../helper/useDebounceFilter";
import FiltersDropdown from "./FiltersDropdown";

import "./SolutionFilter.css";

const SolutionFilter = () => {
  const [solutions, setSolutions] = useState([]);
  const [solutionTerm, setSolutionTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [cursor, setCursor] = useState(0);

  const debouncedSolutionTerm = useDebounceFilter(solutionTerm, 500);

  useEffect(() => {
    (async () => {
      if (debouncedSolutionTerm) {
        // API call
        setIsSearching(true);
        const response = await axios.get(
          `https://backend-mongo-stories.azurewebsites.net/stories/all/solution/${debouncedSolutionTerm}`
        );

        setSolutions(response.data);
        setIsSearching(false);
      } else {
        setSolutions([]);
      }
    })();
  }, [debouncedSolutionTerm]);

  const handleKeyDown = (event, cursor, results) => {
    if (event.keyCode === 38 && cursor > 0) {
      setCursor((prevState) => prevState - 1);
    } else if (event.keyCode === 40 && cursor < results.length - 1) {
      setCursor((prevState) => prevState + 1);
    }
  };

  const setSolutionTermOnClick = (sol) => {
    setSolutionTerm(sol);
  };

  const setSolutionTermOnEnter = (event, cursor, sols) => {
    if (event.key === "Enter") {
      setSolutionTerm(sols[cursor]);
      setTimeout(() => {
        document.querySelector(".solution-dropdown-container").style.display =
          "none";
      }, 100);
    }
  };

  return (
    <FilterFieldContainer>
      <FilterLabel for="solution-filter">By Solution</FilterLabel>
      <input
        autoComplete="off"
        id="solution-filter"
        className="filter-btn"
        placeholder="Enter a solution"
        value={solutionTerm}
        onChange={(e) => setSolutionTerm(e.target.value)}
        onFocus={() => {
          document.querySelector(".solution-dropdown-container").style.display =
            "block";
        }}
        onBlur={() => {
          setTimeout(() => {
            document.querySelector(
              ".solution-dropdown-container"
            ).style.display = "none";
          }, 100);
        }}
        onKeyDown={(event) => {
          handleKeyDown(event, cursor, solutions);
          setSolutionTermOnEnter(event, cursor, solutions);
        }}
      />
      <FiltersDropdown
        debouncedFilterTerm={debouncedSolutionTerm}
        results={solutions}
        isSearching={isSearching}
        setTermOnClick={setSolutionTermOnClick}
        setTermOnEnter={setSolutionTermOnEnter}
        cursor={cursor}
        status="solution"
      />
    </FilterFieldContainer>
  );
};

export default SolutionFilter;
