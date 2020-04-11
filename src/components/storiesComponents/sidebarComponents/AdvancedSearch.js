import React, { useEffect, useState } from "react";
import axios from "axios";

import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";
import "./AdvancedSearch.css";

const AdvancedSearch = ({
  sideBarVisible,
  closeSideBar,
  windowWidth,
  setStoriesBasedOnFilter,
}) => {
  const [allSolutions, setAllSolutions] = useState([]);
  const [solutionTerm, setSolutionTerm] = useState("");

  const [allSectors, setAllSectors] = useState([]);
  const [sectorTerm, setSectorTerm] = useState("");

  const [strategyChosen, setStrategyChosen] = useState(false);
  const [sectorChosen, setSectorChosen] = useState(false);

  useEffect(() => {
    (async () => {
      const sectorResponse = await axios.get(
        "https://backend-mongo-stories.azurewebsites.net/stories/v1/all/sector"
      );

      const solutionResponse = await axios.get(
        "https://backend-mongo-stories.azurewebsites.net/stories/v1/all/solution"
      );

      setAllSectors(sectorResponse.data);
      setAllSolutions(solutionResponse.data);
    })();
  }, []);

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
      `https://climatetree-api-gateway.azurewebsites.net/stories/solution/${solTerm}`
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
        <StrategyFilter setStrategyChosen={setStrategyChosen} />
        <SectorFilter
          strategyChosen={strategyChosen}
          setSectorChosen={setSectorChosen}
          allSectors={allSectors}
          sectorTerm={sectorTerm}
          setSectorTerm={setSectorTerm}
        />
        <SolutionFilter
          strategyChosen={strategyChosen}
          sectorChosen={sectorChosen}
          solutionTerm={solutionTerm}
          onChangeSolutionTerm={onChangeSolutionTerm}
          allSolutions={allSolutions}
        />
      </div>
    </div>
  );
};

export default AdvancedSearch;
