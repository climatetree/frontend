import React, { useEffect, useState } from "react";
import axios from "axios";

import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";
import useDebounceFilter from "../helper/useDebounceFilter";
import "./AdvancedSearch.css";

const AdvancedSearch = ({
  sideBarVisible,
  closeSideBar,
  windowWidth,
  setStoriesBasedOnFilter,
}) => {
  const [solutions, setSolutions] = useState([]);
  const [solutionTerm, setSolutionTerm] = useState("");
  const [isSearchingSolution, setIsSearchingSolution] = useState(false);

  const debouncedSolutionTerm = useDebounceFilter(solutionTerm, 500);

  useEffect(() => {
    (async () => {
      if (debouncedSolutionTerm) {
        // API call
        // setSolutions([]);
        setIsSearchingSolution(true);
        const response = await axios.get(
          `https://backend-mongo-stories.azurewebsites.net/stories/all/solution/${debouncedSolutionTerm}`
        );

        setSolutions(response.data);
        setIsSearchingSolution(false);
      } else {
        setSolutions([]);
      }
    })();
  }, [debouncedSolutionTerm]);

  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

  const escapeButtonPress = (event) => {
    if (event.keyCode === 27) {
      closeSideBar();
    }
  };

  const onChangeSolutionTerm = (solTerm) => {
    setSolutionTerm(solTerm);
  };

  const applyFilterOnClick = async (solTerm) => {
    const response = await axios.get(
      `https://backend-mongo-stories.azurewebsites.net/stories/solution/${solTerm}`
    );

    setStoriesBasedOnFilter(response.data);
  };

  return (
    <div
      id="advanced-search-container"
      className={sideBarVisible ? "unhide-filters" : "hide-filters"}
    >
      <div id="btn-filter-container">
        <span id="title-as">Filters</span>
        <button
          id="apply-filters"
          onClick={() => {
            applyFilterOnClick(solutionTerm);
            if (windowWidth < 951) {
              closeSideBar();
            }
          }}
        >
          Apply Filters
        </button>
      </div>

      <div id="filters">
        <SolutionFilter
          solutionTerm={solutionTerm}
          onChangeSolutionTerm={onChangeSolutionTerm}
          debouncedSolutionTerm={debouncedSolutionTerm}
          isSearchingSolution={isSearchingSolution}
          solutions={solutions}
        />
        <SectorFilter />
        <StrategyFilter />
      </div>
    </div>
  );
};

export default AdvancedSearch;
