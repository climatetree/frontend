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
  const [advancedSearchHeight, setAdvancedSearchHeight] = useState(0);

  // THIS IS FOR STRATEGY FILTER
  const [strategyTerm, setStrategyTerm] = useState("");

  // THIS IS FOR SECTOR FILTER
  const [allSectors, setAllSectors] = useState([]);
  const [sectorTerm, setSectorTerm] = useState("");
  const [loadingSector, setLoadingSector] = useState(false);

  // THIS IS FOR SOLUTION FILTER
  const [allSolutions, setAllSolutions] = useState([]);
  const [solutionTerm, setSolutionTerm] = useState("");

  const [strategyChosen, setStrategyChosen] = useState(false);
  const [sectorChosen, setSectorChosen] = useState(false);

  // ARRAY OF SECTORS THAT ARE CHOSEN
  const [sectorsChosenArr, setSectorsChosenArr] = useState([]);

  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

  useEffect(() => {
    document
      .getElementById("advanced-search-container")
      .addEventListener("resize", () => {
        setAdvancedSearchHeight(
          document.getElementById("advanced-search-container").offsetHeight
        );
      });
  }, [advancedSearchHeight]);

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
    setLoadingSector(true);
    const taxonomyBasedOnSector = await axios.get(
      `https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/sector/${sector}`
    );

    setAllSolutions(
      taxonomyBasedOnSector.data
        .map((t) => t.solution)
        .filter((field, i, arr) => arr.indexOf(field) === i)
    );
    setLoadingSector(false);
    setSolutionTerm("");
  };

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

  const pushSectorValue = (newSector) => {
    let sectorFound = sectorsChosenArr.find((sector) => sector === newSector);
    if (sectorFound) {
      alert(newSector + " is already added");
    } else {
      setSectorsChosenArr((prevState) => [...prevState, newSector]);
    }
  };

  console.log(advancedSearchHeight);

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
          sectorsChosenArr={sectorsChosenArr}
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
