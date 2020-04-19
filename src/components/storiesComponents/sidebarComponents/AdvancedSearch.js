import React, { useEffect, useState } from "react";
import axios from "axios";
import Tooltip from "../../generalComponents/Tooltip";

// import { UserContext } from "../context/UserContext";
import SolutionFilter from "./SolutionFilter";
import SectorFilter from "./SectorFilter";
import StrategyFilter from "./StrategyFilter";

import "./AdvancedSearch.css";

const AdvancedSearch = ({
  generalSearchTerm,
  sideBarVisible,
  closeSideBar,
  windowWidth,
  setStoriesBasedOnFilter,
  loadSpinner,
  setClickFilter,
}) => {
  // THIS IS FOR STRATEGY FILTER
  const [strategyTerm, setStrategyTerm] = useState("");

  // THIS IS FOR SECTOR FILTER
  const [allSectors, setAllSectors] = useState([]);
  const [sectorTerm, setSectorTerm] = useState("");
  const [loadingSector, setLoadingSector] = useState(false);

  // THIS IS FOR SOLUTION FILTER
  const [allSolutions, setAllSolutions] = useState([]);
  const [solutionTerm, setSolutionTerm] = useState("");
  const [loadingSolution, setLoadingSolution] = useState(false);

  const [strategyChosen, setStrategyChosen] = useState(false);
  const [sectorChosen, setSectorChosen] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

  useEffect(() => {
    setStrategyTerm("");
    setSectorTerm("");
    setSolutionTerm("");
    setStrategyChosen(false);
    setSectorChosen(false);
    setClickFilter(false);
  }, [loadSpinner]);

  // SET TAXONOMY FOR SECTOR
  const setTaxonomyForSector = async (strategy) => {
    setLoadingSector(true);
    const taxonomyBasedOnStrategy = await axios.get(
      `https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/strategy/${strategy}`
    );

    setAllSectors(
      taxonomyBasedOnStrategy.data
        .map((t) => t.sector)
        .filter((field, i, arr) => arr.indexOf(field) === i)
    );

    setAllSolutions(
      taxonomyBasedOnStrategy.data
        .map((t) => t.solution)
        .filter((field, i, arr) => arr.indexOf(field) === i)
    );

    setLoadingSector(false);
    setSectorTerm("");
    setSolutionTerm("");
  };

  // SET TAXONOMY FOR SECTOR
  const setTaxonomyForSolution = async (sector) => {
    setLoadingSolution(true);
    const taxonomyBasedOnSector = await axios.get(
      `https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/sector/${sector}`
    );

    setAllSolutions(
      taxonomyBasedOnSector.data
        .map((t) => t.solution)
        .filter((field, i, arr) => arr.indexOf(field) === i)
    );
    setLoadingSolution(false);
    setSolutionTerm("");
  };

  const escapeButtonPress = (event) => {
    if (event.keyCode === 27) {
      closeSideBar();
    }
  };

  const checkingRequestBody = (strategyTerm, searchTerm, sector, solution) => {
    let requestBody = {};

    if (strategyTerm) {
      requestBody["strategy"] = [strategyTerm.toLowerCase()];
    }

    if (searchTerm) {
      requestBody["story_title"] = searchTerm.toLowerCase();
    }

    if (sectorTerm.length) {
      requestBody["sector"] = [sector.toLowerCase()];
    }

    if (solutionTerm.length) {
      requestBody["solution"] = [solution.toLowerCase()];
    }

    return requestBody;
  };

  const applyFilterOnClick = async () => {
    let reqBody = checkingRequestBody(
      strategyTerm,
      generalSearchTerm,
      sectorTerm,
      solutionTerm
    );
    console.log(reqBody);

    try {
      const response = await axios.post(
        "https://climatetree-api-gateway.azurewebsites.net/stories/search",
        reqBody
      );

      setStoriesBasedOnFilter(response.data);
      setClickFilter(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="advanced-search-container"
      className={sideBarVisible ? "unhide-filters" : "hide-filters"}
      onR
    >
      <div id="btn-filter-container">
        <div>
          <span id="title-as">Filters</span>
          <Tooltip
            id="title-tip"
            dark={false}
            description="Choose at least 1 filter to filter stories"
          />
        </div>
        <button
          id="apply-filters"
          onClick={() => {
            applyFilterOnClick();
            if (windowWidth < 951) {
              closeSideBar();
            }
          }}
          disabled={!strategyTerm && !sectorTerm && !solutionTerm}
        >
          Apply Filters
        </button>
      </div>

      <div id="filters">
        <StrategyFilter
          setStrategyChosen={setStrategyChosen}
          strategyTerm={strategyTerm}
          setStrategyTerm={setStrategyTerm}
          setTaxonomyForSector={setTaxonomyForSector}
        />
        <SectorFilter
          strategyChosen={strategyChosen}
          setSectorChosen={setSectorChosen}
          allSectors={allSectors}
          sectorTerm={sectorTerm}
          loadingSector={loadingSector}
          setSectorTerm={setSectorTerm}
          strategyTerm={strategyTerm}
          setTaxonomyForSolution={setTaxonomyForSolution}
        />
        <SolutionFilter
          strategyChosen={strategyChosen}
          sectorChosen={sectorChosen}
          solutionTerm={solutionTerm}
          loadingSolution={loadingSolution}
          setSolutionTerm={setSolutionTerm}
          allSolutions={allSolutions}
        />
      </div>
    </div>
  );
};

export default AdvancedSearch;
