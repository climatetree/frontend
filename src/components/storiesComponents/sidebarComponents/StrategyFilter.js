import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import "./StrategyFilter.css";

const StrategyFilter = () => {
  return (
    <FilterFieldContainer>
      <FilterLabel for="strategy-filter">By Strategy</FilterLabel>
      <div id="strategy-choices">
        <label className="choices-inline">
          <input type="radio" name="strategy" value="ADAPTATION" /> Adaptation
        </label>

        <label className="choices-inline">
          <input type="radio" name="strategy" value="MITIGATION" /> Mitigation
        </label>
      </div>
    </FilterFieldContainer>
  );
};

export default StrategyFilter;
