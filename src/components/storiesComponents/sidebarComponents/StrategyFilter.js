import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import "./StrategyFilter.css";

const StrategyFilter = ({ setStrategyChosen }) => {
  return (
    <FilterFieldContainer>
      <FilterLabel for="strategy-filter">By Strategy</FilterLabel>
      <div id="strategy-choices">
        <label
          className="choices-inline"
          onClick={() => setStrategyChosen(true)}
        >
          <input type="checkbox" name="strategy" value="ADAPTATION" />{" "}
          Adaptation
        </label>

        <label
          className="choices-inline"
          onClick={() => setStrategyChosen(true)}
        >
          <input type="checkbox" name="strategy" value="MITIGATION" />{" "}
          Mitigation
        </label>
      </div>
    </FilterFieldContainer>
  );
};

export default StrategyFilter;
