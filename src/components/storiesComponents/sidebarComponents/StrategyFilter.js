import React from "react";

import FilterFieldContainer from "./FilterFieldContainer";
import FilterLabel from "./FilterLabel";
import Tooltip from "../../generalComponents/Tooltip";

import "./StrategyFilter.css";

const StrategyFilter = ({
  setStrategyChosen,
  setStrategyTerm,
  strategyTerm,
  setTaxonomyForSector,
}) => {
  return (
    <FilterFieldContainer>
      <FilterLabel for="strategy-filter">
        By Climate Strategy
        <Tooltip
          id="title-tip"
          dark={false}
          description={`ClimateTree strategy`}
        />
      </FilterLabel>
      <div id="strategy-choices">
        <label
          className="choices-inline"
          onClick={() => {
            setStrategyChosen(true);
            if (strategyTerm !== "ADAPTATION") {
              setTaxonomyForSector("ADAPTATION");
            }
          }}
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
          onClick={() => {
            setStrategyChosen(true);
            if (strategyTerm !== "MITIGATION") {
              setTaxonomyForSector("MITIGATION");
            }
          }}
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
