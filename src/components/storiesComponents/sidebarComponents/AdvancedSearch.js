import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // ARRAY OF SECTORS THAT ARE CHOSEN
  const [sectorsChosenArr, setSectorsChosenArr] = useState([]);

  // ARRAY OF SOLUTIONS THAT ARE CHOSEN
  const [solutionsChosenArr, setSolutionsChosenArr] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

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

  const checkingRequestBody = (searchTerm, sectors, solutions) => {
    let requestBody = {};

    if (searchTerm) {
      requestBody["title"] = searchTerm;
    }

    if (sectors.length) {
      requestBody["sector"] = sectors;
    }

    if (solutions.length) {
      requestBody["solution"] = solutions;
    }

    return requestBody;
  };

  const applyFilterOnClick = async () => {
    let reqBody = checkingRequestBody(
      generalSearchTerm,
      sectorsChosenArr,
      solutionsChosenArr
    );
    console.log(reqBody);
    // const response = await axios.get(
    //   `https://climatetree-api-gateway.azurewebsites.net/stories/solution/${solTerm}`
    // );

    // setStoriesBasedOnFilter(response.data);
  };

  const pushSectorValue = (newSector) => {
    let sectorFound = sectorsChosenArr.find((sector) => sector === newSector);
    if (sectorFound) {
      alert(newSector + " is already added");
      return 0;
    } else {
      setSectorsChosenArr((prevState) => [...prevState, newSector]);
      return 1;
    }
  };

  const removeSectorValue = (curSector) => {
    setSectorsChosenArr((prevState) =>
      prevState.filter((sector) => sector !== curSector)
    );
  };

  const pushSolutionValue = (newSolution) => {
    let solutionFound = solutionsChosenArr.find(
      (solution) => solution === newSolution
    );
    if (solutionFound) {
      alert(newSolution + " is already added");
      return 0;
    } else {
      setSolutionsChosenArr((prevState) => [...prevState, newSolution]);
      return 1;
    }
  };

  const removeSolutionValue = (curSolution) => {
    setSolutionsChosenArr((prevState) =>
      prevState.filter((solution) => solution !== curSolution)
    );
  };

  return (
    <div
      id="advanced-search-container"
      className={sideBarVisible ? "unhide-filters" : "hide-filters"}
      onR
    >
      <div id="btn-filter-container">
        <span id="title-as">Filters</span>
        <button
          id="apply-filters"
          onClick={() => {
            applyFilterOnClick();
            if (windowWidth < 951) {
              closeSideBar();
            }
          }}
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
          pushSectorValue={pushSectorValue}
          removeSectorValue={removeSectorValue}
          sectorsChosenArr={sectorsChosenArr}
        />
        <SolutionFilter
          strategyChosen={strategyChosen}
          sectorChosen={sectorChosen}
          solutionTerm={solutionTerm}
          loadingSolution={loadingSolution}
          setSolutionTerm={setSolutionTerm}
          allSolutions={allSolutions}
          pushSolutionValue={pushSolutionValue}
          removeSolutionValue={removeSolutionValue}
          solutionsChosenArr={solutionsChosenArr}
        />
      </div>
    </div>
  );
};

export default AdvancedSearch;
