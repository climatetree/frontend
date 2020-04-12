import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import "./StrategyFilter.css";

const StrategyFilter = ({ setStrategyChosen, setStrategyTerm }) => {
  return (
    <FilterFieldContainer>
      <FilterLabel for="strategy-filter">By Strategy</FilterLabel>
      <div id="strategy-choices">
        <label
          className="choices-inline"
          onClick={() => setStrategyChosen(true)}
        >
          <input
            type="radio"
            name="strategy"
            value="ADAPTATION"
            onChange={() => setStrategyTerm("ADAPTATION")}
          />{" "}
          Adaptation
        </label>

        <label
          className="choices-inline"
          onClick={() => setStrategyChosen(true)}
        >
          <input
            type="radio"
            name="strategy"
            value="MITIGATION"
            onChange={() => setStrategyTerm("MITIGATION")}
          />{" "}
          Mitigation
        </label>
      </div>
    </FilterFieldContainer>
  );
};

export default StrategyFilter;
