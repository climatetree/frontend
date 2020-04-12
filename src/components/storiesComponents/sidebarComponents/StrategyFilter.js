import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import "./StrategyFilter.css";

const StrategyFilter = ({
  setStrategyChosen,
  setStrategyTerm,
  strategyTerm,
}) => {
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
            checked={"ADAPTATION" === strategyTerm}
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
            checked={"MITIGATION" === strategyTerm}
            onChange={() => setStrategyTerm("MITIGATION")}
          />{" "}
          Mitigation
        </label>
      </div>
    </FilterFieldContainer>
  );
};

export default StrategyFilter;
