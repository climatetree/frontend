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
  const [strategyTerm, setStrategyTerm] = useState("");

  const [allSectors, setAllSectors] = useState([]);
  const [sectorTerm, setSectorTerm] = useState("");

  const [allSolutions, setAllSolutions] = useState([]);
  const [solutionTerm, setSolutionTerm] = useState("");

  const [strategyChosen, setStrategyChosen] = useState(false);
  const [sectorChosen, setSectorChosen] = useState(false);

  useEffect(() => {
    (async () => {
      if (strategyTerm) {
        const taxonomyBasedOnStrategy = await axios.get(
          `https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/strategy/${strategyTerm}`
        );

        setTaxonomySectionBasedOn(
          "sector",
          taxonomyBasedOnStrategy.data,
          setAllSectors
        );
      }
    })();
  }, [strategyTerm]);

  useEffect(() => {
    (async () => {
      if (sectorTerm) {
        const taxonomyBasedOnSector = await axios.get(
          `https://climatetree-api-gateway.azurewebsites.net/stories/taxonomy/sector/${sectorTerm}`
        );

        setTaxonomySectionBasedOn(
          "solution",
          taxonomyBasedOnSector.data,
          setAllSolutions
        );
      }
    })();
  }, [sectorTerm]);

  useEffect(() => {
    document.addEventListener("keydown", escapeButtonPress);

    return () => {
      document.removeEventListener("keydown", escapeButtonPress);
    };
  }, []);

  const setTaxonomySectionBasedOn = (section, taxonomy, setFunction) => {
    let filterFields = taxonomy.map((t) =>
      section === "sector" ? t.sector : t.solution
    );

    filterFields = filterFields.filter(
      (field, i, arr) => arr.indexOf(field) === i
    );

    setFunction(filterFields);
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
        <StrategyFilter
          setStrategyChosen={setStrategyChosen}
          strategyTerm={strategyTerm}
          setStrategyTerm={setStrategyTerm}
        />
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
